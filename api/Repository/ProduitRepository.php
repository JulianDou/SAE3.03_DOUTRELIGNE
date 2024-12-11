<?php
require_once 'EntityRepository.php';
require_once __DIR__ . '/../Class/Produit.php';

class ProduitRepository extends EntityRepository {

    public function __construct() {
        parent::__construct();
    }

    public function find($id) {
        $stmt = $this->cnx->prepare("
            SELECT DATE_FORMAT(order_date, '%Y-%m') as month, SUM(OrderItems.quantity * Products.price) as total_value
            FROM Orders
            JOIN OrderItems ON Orders.id = OrderItems.order_id
            JOIN Products ON OrderItems.product_id = Products.id
            WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
            AND Products.id = :id
            GROUP BY month
            ORDER BY month ASC;
        ");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt = $this->cnx->prepare("SELECT product_name FROM Products WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $name = $stmt->fetch(PDO::FETCH_ASSOC);

        $final = [
            "name" => $name,
            "data" => $result
        ];
        if ($final) {
            return $final;
        }
        return false;
    }

    public function findTop3(): array{
        $stmt = $this->cnx->prepare("
            SELECT product_id, SUM(quantity) as total_quantity
            FROM OrderItems
            WHERE order_id IN (
                SELECT id
                FROM Orders
                WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 2 MONTH)
            )
            GROUP BY product_id
            ORDER BY total_quantity DESC
            LIMIT 3;
        ");
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result) {
            $produits = [];
            foreach ($result as $obj) {
                $stmt = $this->cnx->prepare("SELECT * FROM Products WHERE id = :id");
                $stmt->bindParam(':id', $obj['product_id']);
                $stmt->execute();
                $produit = $stmt->fetch(PDO::FETCH_ASSOC);
                array_push($produits, new Produit($produit['id'], $produit['product_name'], $produit['category'], $produit['price'], $produit['quantity'], $produit['stock'], $obj['total_quantity']));
            }
            return $produits;
        }
        return false;
    }

    public function findLowStock(): array{
        $stmt = $this->cnx->prepare("
            SELECT * FROM Products 
            ORDER BY stock ASC
            LIMIT 10;
        ");
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result) {
            $produits = [];
            foreach ($result as $obj) {
                array_push($produits, new Produit($obj['id'], $obj['product_name'], $obj['category'], $obj['price'], $obj['quantity'], $obj['stock'], null));
            }
            return $produits;
        }
        return false;
    }

    public function findAll(){
        $stmt = $this->cnx->prepare("
            SELECT id, product_name, category FROM Products
        ");
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result){
            return $result;
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