<?php foreach ( $result as $key => $data ): ?>
    <tr class="">
        <td class="sno">
            <?php echo ( $key + 1 ) + ( $currentpage - 1 ) * $perpage; ?>
        </td>
        <td class="vmf">
            <?php echo $data['vehicle_manufacture']; ?>
        </td>
        <td class="vstatus">
            <?php if ( isset( $data['brand_status'] ) ): ?>
            <?php if ( $data['brand_status'] == 'enabled' ): ?>
            <small class="alert alert-success p-0 px-1">
                Enabled
            </small>
            <?php elseif ( $data['brand_status'] == 'disabled' ): ?>
            <small class="alert alert-danger p-0 px-1">
                Disabled
            </small>
            <?php endif;?>
            <?php else: ?>
            <small class="alert alert-info p-0 px-1">
                Unknown Status
            </small>
            <?php endif;?>



        </td>
        <td class="vactions">
            <a title="Status"
            data-bs-toggle="tooltip" data-bs-title="Status"
            class="btn btn-sm status-update-btn fw-bold
                <?php echo ( isset( $data['brand_status'] ) && $data['brand_status'] == 'enabled' ) ? 'btn-danger' : 'btn-success'; ?>"
            href="<?php echo base_url( 'admin/update-status' ) ?>" data-mid="<?php echo $data['_id'] ?>">

                <?php if ( isset( $data['brand_status'] ) && $data['brand_status'] == 'enabled' ): ?>
                    <i class='fa fa-ban'></i>
                <?php elseif ( isset( $data['brand_status'] ) && $data['brand_status'] == 'disabled' ): ?>
                    <i class='fa fa-check'></i>
                <?php endif;?>
            </a>



            <a href="<?php echo base_url( 'admin/update-vehicle-brand' ); ?>"
                class="update-vehicle-brand btn btn-warning mx-1 btn-sm" id="update-vehicle-brand"
                data-mid="<?php echo $data['_id']; ?>"
                data-bs-toggle="tooltip" data-bs-title="Edit"
                data-manufacture="<?php echo $data['vehicle_manufacture']; ?>" title="Edit">
                <i class="fa fa-pencil"></i>
            </a>

            <a href="<?php echo base_url( 'admin/delete-vehicle-brand' ); ?>"
                class="delete-vehicle-brand btn btn-danger mx-1 btn-sm" id="delete-vehicle-brand"
                data-mid="<?php echo $data['_id']; ?>"
                data-bs-toggle="tooltip" data-bs-title="Delete">
                <i class="fa fa-trash"></i>
            </a>
        </td>

    </tr>
<?php endforeach;?>