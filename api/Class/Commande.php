<?php

class Commande implements JsonSerializable {
    private $id;
    private $customer_id;
    private $order_date;
    private $order_status;
    private $weight;
    private $shipping_cost;

    public function __construct($id, $customer_id, $order_date, $order_status, $weight, $shipping_cost) {
        $this->id = $id;
        $this->customer_id = $customer_id;
        $this->order_date = $order_date;
        $this->order_status = $order_status;
        $this->weight = $weight;
        $this->shipping_cost = $shipping_cost;
    }

    public function jsonSerialize(): mixed{
        return [
            'id' => $this->id,
            'customer_id' => $this->customer_id,
            'order_date' => $this->order_date,
            'order_status' => $this->order_status,
            'weight' => $this->weight,
            'shipping_cost' => $this->shipping_cost
        ];
    }
}
