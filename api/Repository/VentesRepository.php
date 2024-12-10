<?php
require_once 'EntityRepository.php';

class VentesRepository extends EntityRepository {

    public function __construct() {
        parent::__construct();
    }

    public function find($product) {
        return false;
    }

    public function findAll(): array{
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