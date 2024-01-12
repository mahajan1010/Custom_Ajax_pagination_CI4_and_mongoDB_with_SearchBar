<div class="main-content container-fluid">
    <div class="page-title mt-4">
        <div class="row">
            <div class="col-12 col-md-12">
                <div class="d-flex justify-content-between align-items-center">
                    <h2>Vehicle Brands</h2>
                    <a class="btn btn-primary" href="<?php echo base_url( 'admin/add-vehicle-brand' ) ?>"
                        id="add-vehicle-brand">Add New</a>
                </div>
            </div>
            <div class="col-12 col-md-6 order-md-2 order-first">

            </div>
        </div>
    </div>
    <!-- <div class="myspinner page-loader d-none">
        <div class="spinner-border" role="status"></div>
    </div> -->
    <section class="section mt-4">
        <div class="card">
            <div class="card-header">
            </div>
            <div class="card-body table-parent" id="table-parent">
                <!-- <div class="myspinner page-loader d-none">
                    <div class="spinner-border" role="status"></div>
                </div> -->
                <div class="col-md-3 offset-md-9 col-12 mb-4">
                    <input type="search" class="form-control search" 
                    placeholder="Search Here" id="module-search">
                </div>
                <table class='table table-striped w-100'>
                    <thead>
                        <tr class="">
                            <th>S.No</th>
                            <th>Manufacture</th>
                            <th>Brand Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody class="list" id="module-list"
                    data-url="<?php echo site_url("admin/vehicle-brand/list") ?>">
                    </tbody>
                </table>

            </div>
            <div class="pagination justify-content-end me-3" id="module-pager">
            </div>
        </div>

    </section>
</div>
