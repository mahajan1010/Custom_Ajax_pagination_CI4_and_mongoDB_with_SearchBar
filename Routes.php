<?php
/* a route group that starts from  */
$routes->group( 'admin', ['filter' => 'adminsession'], static function ( $routes )
{
    /* route to load documentation for mapping modules and namespaces */
    $routes->get( '', '\Admin\Controllers\Handle::index' );
    $routes->post( 'do-login', '\Admin\Controllers\Auth::login' );
    $routes->get( 'dashboard', '\Admin\Controllers\Handle::dashboard' );

    /* Routes for Brands */

    $routes->get( 'vehicle-brands', '\Admin\Controllers\VehicleBrand::index' );
    $routes->get( 'vehicle-brand/list', '\Admin\Controllers\VehicleBrand::list' );
    $routes->post( 'update-vehicle-brand/(:any)/(:any)', '\Admin\Controllers\VehicleBrand::updateVehicleBrand/$1/$2' );
    $routes->post( 'update-vehicle-brand', '\Admin\Controllers\VehicleBrand::updateVehicleBrandName' );
    $routes->get( 'add-vehicle-brand', '\Admin\Controllers\VehicleBrand::addVehicleBrand' );
    $routes->post( 'add-vehicle-brand', '\Admin\Controllers\VehicleBrand::addNewVehicleBrand' );
    $routes->post( 'delete-vehicle-brand/(:any)', '\Admin\Controllers\VehicleBrand::deleteVehicleBrand/$1' );
    $routes->post( 'update-status/(:any)', '\Admin\Controllers\VehicleBrand::updateStatusBrand/$1' );

    /* Routes for Models */

    $routes->get( 'vehicle-models', '\Admin\Controllers\VehicleModel::index' );
    $routes->get( 'vehicle-model/list', '\Admin\Controllers\VehicleModel::list' );
    $routes->post( 'update-vehicle-model/(:any)/(:any)/(:any)(:any)', '\Admin\Controllers\VehicleModel::udpateVehicleModel/$1/$2/$3/$4' );
    $routes->post( 'update-vehicle-model-data', '\Admin\Controllers\VehicleModel::updateVehicleModelData' );
    $routes->post( 'add-vehicle-model-data', '\Admin\Controllers\VehicleModel::addVehicleModelData' );
    $routes->get( 'add-vehicle-model', '\Admin\Controllers\VehicleModel::addVehicleModel' );
    $routes->post( 'delete-vehicle-model/(:any)', '\Admin\Controllers\VehicleModel::deleteVehicleModel/$1' );
    $routes->get( 'view-vehicle-model/(:any)/(:any)/(:any)', '\Admin\Controllers\VehicleModel::viewVehicleModel/$1/$2/$3' );
    $routes->post( 'update-status-model/(:any)', '\Admin\Controllers\VehicleModel::updateStatusModel/$1' );

    /* Routes for Users */

    $routes->get( 'users', '\Admin\Controllers\Users::index' );
    $routes->get('users/list','\Admin\Controllers\Users::list');
    $routes->post( 'update-status-users/(:any)', '\Admin\Controllers\Users::updateStatusUsers/$1' );
    $routes->post( 'delete-users/(:any)', '\Admin\Controllers\Users::deleteUsers/$1' );

    $routes->get( 'logout', '\Admin\Controllers\Handle::logout' );
}
);
