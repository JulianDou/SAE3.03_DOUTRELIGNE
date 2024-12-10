<?php

class Produit implements JsonSerializable {
    private $id;
    private $product_name;
    private $category;
    private $price;
    private $quantity;
    private $stock;
    private $quantity_sold;

    public function __construct($id, $product_name, $category, $price, $quantity, $stock, $quantity_sold = null) {
        $this->id = $id;
        $this->product_name = $product_name;
        $this->category = $category;
        $this->price = $price;
        $this->quantity = $quantity;
        $this->stock = $stock;
        $this->quantity_sold = $quantity_sold;
    }

    public function jsonSerialize(): mixed {
        return [
            'id' => $this->id,
            'product_name' => $this->product_name,
            'category' => $this->category,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'stock' => $this->stock,
            'quantity_sold' => $this->quantity_sold
        ];
    }
}
