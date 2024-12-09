<?php

require_once("Controller.php");
require_once("Repository/CommandeRepository.php");

class CommandeController extends Controller {

    private CommandeRepository $commandes;

    public function __construct() {
        $this->commandes = new CommandeRepository();
    }

    protected function processGetRequest(HttpRequest $request) {
        $status = $request->getParam("status");
        if ($status == "Pending" || $status == "Delivered" || $status == "Shipped") {
            $commande = $this->commandes->find($status);

            if ($commande) {
                return $commande;
            }
            http_response_code(404);
            return ['error' => 'Commande introuvable'];
        }
        http_response_code(404);
        return ['error' => 'Paramètre inconnu : les commandes peuvent être de statut Delivered, Shipped ou Pending'];
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