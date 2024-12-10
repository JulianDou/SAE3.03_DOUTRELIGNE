<?php

require_once("Controller.php");
require_once("Repository/ProduitRepository.php");

class ProduitController extends Controller {

    private ProduitRepository $produits;

    public function __construct() {
        $this->produits = new ProduitRepository();
    }

    protected function processGetRequest(HttpRequest $request) {
        $status = $request->getParam("mode");
        if ($status == "top3") {
            $produit = $this->produits->find($status);

            if ($produit) {
                return $produit;
            }
            http_response_code(404);
            return ['error' => 'Produit introuvable'];
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