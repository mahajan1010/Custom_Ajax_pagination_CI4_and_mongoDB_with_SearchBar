const Base = {
    loadBar: null,

    fixedScroll: () =>
    {
        const elements = document.getElementsByClassName( 'set-browser-height' );
        if ( elements ) 
        {
            for ( const item of elements )
            {
                console.log( window.innerHeight );
                item.style.height = `${window.innerHeight - 150}px`;
            }
        }
    },

    ajax: ( url, method, data, successCallback, errorCallback, showLoad = true ) =>
    {
        if ( showLoad )
        {
            Base.loading( .2 );
        }
        let xhr = new XMLHttpRequest();
        xhr.open( method, url );
        xhr.responseType = 'json';
        xhr.setRequestHeader( 'X-Requested-With', 'XMLHTTPRequest' );
        // request state change event
        xhr.onreadystatechange = () =>
        {
            if ( xhr.readyState !== 4 )
            {
                Base.loading( .5 );
            }
            else
            {
                if ( showLoad ) { Base.loading( 1 ); }
                if ( xhr.status === 200 )
                {

                    // request successful - show response
                    if ( typeof ( successCallback ) == 'function' ) 
                    {
                        successCallback( xhr.response );
                    }

                    /* redirect if available */
                    if ( typeof ( xhr.response.redirect ) == 'string' ) 
                    {
                        window.location.href = xhr.response.redirect;
                    }

                }
                else if ( xhr.status == 403 && typeof ( xhr.getResponseHeader( 'location' ) ) == 'string' )
                {
                    window.location.href = xhr.getResponseHeader( 'location' );
                }
                else
                {
                    // request error

                    if (
                        typeof ( xhr.response.error ) &&
                        typeof ( xhr.response.messages.error ) == 'string'
                    ) 
                    {
                        Base.notify( xhr.statusText, xhr.response.messages.error, 'danger', 3000 );
                    }
                    else
                    {
                        /* generic errors */
                        Base.notify( xhr.statusText,
                            `${xhr.response.title}<br>${xhr.response.message}`,
                            'danger'
                        );
                    }

                    /* load the callback */
                    if ( typeof ( errorCallback ) == 'function' ) 
                    {
                        errorCallback( xhr.response );
                    }
                }
            }
        };

        xhr.onprogress = ( event ) =>
        {
            if ( event.lengthComputable == true && showLoad ) 
            {
                Base.loading( event.loaded / event.total );
            }
        };

        // start request
        xhr.send( data );
    },

    loading: ( percent ) =>
    {
        if ( Base.loadBar == null )
        {
            Base.loadBar = new ProgressBar.Line( '#progress-container', {
                strokeWidth: .5,
                easing: 'easeInOut',
                duration: 1000,
                color: 'var(--bs-primary)',
                trailColor: '#eee',
                trailWidth: 1,
                svgStyle: { width: '100%', height: '100%' }
            } );
        }

        Base.loadBar.animate( percent, ( e ) =>
        {
            if ( percent == 1 )
            {
                Base.loadBar.destroy();
                Base.loadBar = null;
            }
        } );
    },

    notify: ( title, message, type, timeout = 4000 ) =>
    {
        const toastElmId = `toast-${Date.now()}`;
        const toastContainer = document.getElementById( 'toast-container' );
        const toastHtml = `
        <div id="${toastElmId}" class="toast border-3 border-${type}" role="alert" 
        aria-live="assertive" aria-atomic="true" data-bs-autohide="true" data-bs-delay="${timeout}">
            <div class="toast-header text-bg-${type} rounded-0">
                <strong class="me-auto text-capitalize">
                    ${title}
                </strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>`;

        if ( toastContainer ) 
        {
            toastContainer.innerHTML = toastContainer.innerHTML + toastHtml;
        }

        const newToast = document.getElementById( toastElmId );

        if ( newToast ) 
        {
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance( newToast );
            toastBootstrap.show();
        }
        return newToast;
    },

    modal: ( title, html, showCallback = undefined, submitCallback = undefined, cancelCallback = undefined ) =>
    {
        let modalContainer = document.getElementById( 'modal-container' );
        if ( modalContainer )
        {
            let modalHTML = `
                <div class="modal fade" id="my-modal" tabindex="-1" aria-labelledby="my-modalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h5 class="modal-title" id="modal-title">${title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                ${html}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            modalContainer.innerHTML = modalHTML;
            let modalElm = document.getElementById( 'my-modal' );
            var myModal = new bootstrap.Modal( modalElm );

            modalElm.addEventListener( 'shown.bs.modal', ( me ) =>
            {
                if ( !typeof ( showCallback ) == 'function' )
                {
                    showCallback();
                }
            } );

            myModal.show();
            return myModal;
        }
    },

    initTooltip: () =>
    {
        const tooltipTriggerList = document.querySelectorAll( '[data-bs-toggle="tooltip"]' );
        const tooltipList = [ ...tooltipTriggerList ].map( tooltipTriggerEl => new bootstrap.Tooltip( tooltipTriggerEl ) );
    },

    pager: ( showCallback ) =>
    {
        const modulePager = document.getElementById( 'module-pager' );
        const moduleList = document.getElementById( 'module-list' );
        const moduleSearch = document.getElementById( 'module-search' );

        if ( moduleSearch )
        {
            let timeout = null;
            moduleSearch.onkeyup = ( e ) =>
            {
                clearTimeout( timeout );
                timeout = setTimeout( function ()
                {
                    Base.pager( showCallback );
                }, 1000 );
            };
        }

        if ( moduleList )
        {
            let ajaxUrl = moduleList.dataset.url;
            let url = new URL( ajaxUrl );
            url.searchParams.set( 'query', moduleSearch.value );
            Base.ajax(
                url.toString(),
                'get',
                null,
                ( response ) =>
                {
                    moduleList.innerHTML = response.html;
                    modulePager.innerHTML = response.pager;
                    setTimeout( () =>
                    {

                        if ( typeof ( showCallback ) == 'function' )
                        {
                            showCallback();
                        }
                        Base.initTooltip();

                        let pageLinks = document.getElementsByClassName( 'page-link' );
                        if ( pageLinks.length > 0 ) 
                        {
                            for ( const link of pageLinks )
                            {
                                link.onclick = ( e ) =>
                                {
                                    e.preventDefault();
                                    moduleList.setAttribute( 'data-url', link.getAttribute( 'href' ) );
                                    Base.pager( showCallback );
                                };
                            }
                        }

                    }, 300 );
                }
            );
        }
    },
};

/* anonymous function */
( () =>
{
    Base.fixedScroll();
} )();
