<?php

require_once("Controller.php");
require_once("Repository/VentesRepository.php");

class VentesController extends Controller {

    private VentesRepository $ventes;

    public function __construct() {
        $this->ventes = new VentesRepository();
    }

    protected function processGetRequest(HttpRequest $request) {
        $category = $request->getParam("status");
        $product = $request->getParam("product");
        if ($category) {
            http_response_code(503);
            return ['error' => 'Non encore implémenté'];
        }
        elseif($product) {
            http_response_code(503);
            return ['error' => 'Non encore implémenté'];
        }
        else{
            $vente = $this->ventes->findAll();
            if ($vente) {
                return $vente;
            }
            http_response_code(404);
            return ['error' => 'Aucune vente trouvée'];
        }
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