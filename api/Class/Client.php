<?php

class Client implements JsonSerializable {
    private $id;
    private $firs_name;
    private $last_name;
    private $email;
    private $country;
    private $city;
    private $lat;
    private $lng;

    public function __construct($id, $firs_name, $last_name, $email, $country, $city, $lat, $lng) {
        $this->id = $id;
        $this->firs_name = $firs_name;
        $this->last_name = $last_name;
        $this->email = $email;
        $this->country = $country;
        $this->city = $city;
        $this->lat = $lat;
        $this->lng = $lng;
    }

    public function jsonSerialize(): mixed{
        return [
            'id' => $this->id,
            'firs_name' => $this->firs_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'country' => $this->country,
            'city' => $this->city,
            'lat' => $this->lat,
            'lng' => $this->lng
        ];
    }
}
