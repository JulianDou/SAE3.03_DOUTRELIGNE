<?php
require_once 'EntityRepository.php';
require_once __DIR__ . '/../Class/Commande.php';

class CommandeRepository extends EntityRepository {

    public function __construct() {
        parent::__construct();
    }

    public function find($status): array {
        $stmt = $this->cnx->prepare("SELECT count(*) FROM Orders WHERE order_status = :status");
        $stmt->bindParam(':status', $status, PDO::PARAM_STR);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result) {
            $answer = [
                'count' => $result[0]['count(*)'],
            ];
            return $answer;
        }
        return false;
    }

    public function findTotal($sorted): array {
        if ($sorted == "true"){
            $stmt = $this->cnx->prepare("
                SELECT DATE_FORMAT(order_date, '%Y-%m') as month, Products.category as product, SUM(OrderItems.quantity * Products.price) as total_value
                FROM Orders
                JOIN OrderItems ON Orders.id = OrderItems.order_id
                JOIN Products ON OrderItems.product_id = Products.id
                WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
                GROUP BY month, product
                ORDER BY month DESC, total_value DESC
                LIMIT 30;
            ");
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if ($result) {
                return $result;
            }
            return false;
        }
        else{
            $stmt = $this->cnx->prepare("
                SELECT DATE_FORMAT(order_date, '%Y-%m') as month, SUM(OrderItems.quantity * Products.price) as total_value
                FROM Orders
                JOIN OrderItems ON Orders.id = OrderItems.order_id
                JOIN Products ON OrderItems.product_id = Products.id
                WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
                GROUP BY month
                ORDER BY month DESC;
            ");
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if ($result) {
                return array_slice($result, 0, 6);
            }
            return false;
        }
        return false;
    }

    public function findByCustomer($customer){
        $stmt = $this->cnx->prepare("
            SELECT Products.id, Products.product_name, OrderItems.quantity, Products.category
            FROM Orders
            JOIN OrderItems ON Orders.id = OrderItems.order_id
            JOIN Products ON OrderItems.product_id = Products.id
            WHERE Orders.customer_id = :customer
            ORDER BY Products.category;
        ");
        $stmt->bindParam(':customer', $customer, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result) {
            return $result;
        }
        return false;
    }

    public function findWorld(){
        $stmt = $this->cnx->prepare("
            SELECT Customers.country, Orders.order_date, SUM(OrderItems.quantity) as total_quantity
            FROM Orders
            JOIN Customers ON Orders.customer_id = Customers.id
            JOIN OrderItems ON Orders.id = OrderItems.order_id
            WHERE Orders.order_status = 'Delivered' OR Orders.order_status = 'Shipped'
            GROUP BY Customers.country, Orders.order_date
            ORDER BY Orders.order_date, Customers.country;
        ");
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result) {
            return $result;
        }
        return false;
    }

    public function findAll(){
        return false;
    }

    public function save($entity){
        return false;
    }

    public function delete($id){
        return false;
    }

    public function update($entity){
        return false;
    }
    
}