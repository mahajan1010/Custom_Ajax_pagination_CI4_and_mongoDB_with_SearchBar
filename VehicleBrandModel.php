<?php namespace VehicleBrand\Models;

use CodeIgniter\Model;

class VehicleBrandModel extends Model
{
    protected $collection;

    public function __construct()
    {
        $connection = new \App\Libraries\DatabaseConnector();
        $database = $connection->database;
        $this->collection = $database->vehiclemanufactures;
    }
}

