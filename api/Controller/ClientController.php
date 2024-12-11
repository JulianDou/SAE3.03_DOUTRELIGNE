<?php

require_once("Controller.php");
require_once("Repository/ClientRepository.php");

class ClientController extends Controller {

    private ClientRepository $clients;

    public function __construct() {
        $this->clients = new ClientRepository();
    }

    protected function processGetRequest(HttpRequest $request) {
        $id = $request->getParam("id");
        if ($id) {
            return $this->clients->find($id);
        }
        return $this->clients->findAll();
    }

    protected function processPostRequest(HttpRequest $request) {
        return false;
    }

    protected function processDeleteRequest(HttpRequest $request) {
        return false;
    }

    protected function processPatchRequest(HttpRequest $request) {
        return false;
    }
}