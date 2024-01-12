const VehicleBrand = {


    /* Loading the update modal form */
    loadUpdateBrandForm: function ()
    {
        var updateVehicleBrands = document.querySelectorAll( '.update-vehicle-brand' );

        if ( updateVehicleBrands.length > 0 )
        {
            updateVehicleBrands.forEach( function ( updateVehicleBrand )
            {
                updateVehicleBrand.addEventListener( 'click', function ( e )
                {
                    var brand = updateVehicleBrand.dataset.brand;
                    var brandId = updateVehicleBrand.dataset.mid;

                    e.preventDefault();

                    Base.ajax(
                        updateVehicleBrand.getAttribute( 'href' ) + '/' + brand + '/' + brandId,
                        'post',
                        null,
                        function ( response )
                        {
                            let modal = Base.modal(
                                response.title,
                                response.html,
                                function ()
                                {
                                    /* event register */
                                    var changeVehicleBrand = document.getElementById( response.form );
                                    if ( changeVehicleBrand )
                                    {
                                        changeVehicleBrand.onsubmit = function ( e )
                                        {
                                            e.preventDefault();
                                            Base.ajax(
                                                changeVehicleBrand.getAttribute( 'action' ),
                                                changeVehicleBrand.getAttribute( 'method' ),
                                                new FormData( changeVehicleBrand ),
                                                function ( response )
                                                {
                                                    Base.notify(
                                                        'Success',
                                                        [ response.message ],
                                                        'success',
                                                        2000
                                                    );
                                                }
                                            );
                                        };
                                    }
                                }
                            );
                        }
                    );
                } );
            } );
        }
    },

    loadForms: function ( id )
    {
        var addVehicleModel = document.getElementById( id );
        addVehicleModel.addEventListener( 'click', function ( e )
        {
            e.preventDefault();

            Base.ajax(
                addVehicleModel.getAttribute( 'href' ),
                'get',
                null,
                ( response ) =>
                {
                    let modal = Base.modal(
                        response.title,
                        response.html,
                        () =>
                        {
                            /* event register */
                            var addVehicleModel = document.getElementById( response.form );
                            if ( addVehicleModel )
                            {
                                addVehicleModel.onsubmit = function ( e )
                                {
                                    e.preventDefault();
                                    Base.ajax(
                                        addVehicleModel.getAttribute( 'action' ),
                                        addVehicleModel.getAttribute( 'method' ),
                                        new FormData( addVehicleModel ),
                                        ( response ) => 
                                        {
                                            Base.notify(
                                                'Success',
                                                [
                                                    response.message
                                                ],
                                                'success',
                                                2000
                                            );
                                            modal.hide();
                                        }
                                    );
                                };
                            }
                        }
                    );
                }
            );
        } );
    },

    deletionBrand: function ( classname )
    {
        var deleteVehicleBrands = document.querySelectorAll( '.' + classname );

        if ( deleteVehicleBrands.length > 0 )
        {
            deleteVehicleBrands.forEach( function ( deleteVehicleBrand ) 
            {
                deleteVehicleBrand.addEventListener( 'click', function ( e )
                {
                    var mid = deleteVehicleBrand.dataset.mid;
                    e.preventDefault();
                    Base.ajax(
                        deleteVehicleBrand.getAttribute( 'href' ) + '/' + mid,
                        'post',
                        null,
                        ( response ) => 
                        {
                            Base.notify(
                                'Success',
                                [
                                    response.message
                                ],
                                'success',
                                2000
                            );
                            modal.hide();
                        }

                    );
                } );
            } );

        }
    },

    statusUpdate: function ( classname )
    {
        var statusUpdateBtns = document.querySelectorAll( "." + classname );
        if ( statusUpdateBtns.length > 0 )
        {
            statusUpdateBtns.forEach( function ( statusUpdateBtn )
            {
                statusUpdateBtn.addEventListener( 'click', function ( e )
                {
                    var particularId = statusUpdateBtn.dataset.mid;
                    var anchor_elm = statusUpdateBtn.parentNode;

                    e.preventDefault();
                    Base.ajax(
                        statusUpdateBtn.getAttribute( 'href' ) + '/' + particularId,
                        'post',
                        null,
                        ( response ) =>
                        {
                            if ( response.status == 'disabled' )
                            {
                                statusUpdateBtn.innerHTML = "<i class='fa fa-check'>";
                                anchor_elm.classList.add( 'btn-success' );
                                anchor_elm.classList.remove( 'btn-danger' );
                                var smallElement = anchor_elm.closest( 'tr' ).querySelector( '.vstatus small' );
                                if ( smallElement )
                                {
                                    smallElement.innerHTML = 'Disabled';
                                }
                            }
                            else
                            {
                                statusUpdateBtn.innerHTML = "<i class='fa fa-ban'>";
                                var smallElement = anchor_elm.closest( 'tr' ).querySelector( '.vstatus small' );
                                if ( smallElement )
                                {
                                    smallElement.innerHTML = 'Enabled';
                                }
                            }
                        }
                    );

                } );
            } );
        }
    },



};

/* anonymous function */
( () =>
{


    // VehicleBrand.loadDatatable();


    VehicleBrand.loadForms( 'add-vehicle-brand' );
    Base.pager( () =>
    {
        VehicleBrand.loadUpdateBrandForm();
        VehicleBrand.deletionBrand( 'delete-vehicle-brand' );
        VehicleBrand.statusUpdate( 'status-update-btn' );
    } );

} )();

