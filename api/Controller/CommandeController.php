<?php

require_once("Controller.php");
require_once("Repository/CommandeRepository.php");

class CommandeController extends Controller {

    private CommandeRepository $commandes;

    public function __construct() {
        $this->commandes = new CommandeRepository();
    }

    protected function processGetRequest(HttpRequest $request) {
        $stat = $request->getParam("stat");
        $sorted = $request->getParam("sorted");
        if ($stat == "total") {
            if ($sorted == "true") {
                return $this->commandes->findTotal("true");
            }
            return $this->commandes->findTotal("false");
        }        
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
        return ['error' => 'Paramètre inconnu'];
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