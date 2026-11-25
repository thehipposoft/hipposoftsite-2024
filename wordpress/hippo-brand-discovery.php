<?php
// ================================================================
// HIPPO BRAND DISCOVERY
//
// Recibe el formulario de descubrimiento de marca de
// thehipposoft.com/[locale]/branding y lo guarda como CPT.
//
// Endpoint: POST /wp-json/hippo/v1/branding
// Auth:     Application Password (Basic Auth), igual que el survey.
//
// Es independiente del Project Survey: no redeclara funciones ni
// toca el CPT project_survey. Todas las funciones usan el prefijo
// hippo_brand_ para evitar colisiones.
// ================================================================

// URL pública donde Next sirve las imágenes de logos y tipografías
// (public/assets/images/branding). Se usa para las miniaturas del admin.
if ( ! defined( 'HIPPO_BRAND_ASSETS' ) ) {
    define( 'HIPPO_BRAND_ASSETS', 'https://www.thehipposoft.com/assets/images/branding' );
}

// ─────────────────────────────────────────────
// OPCIONES DEL FORMULARIO (deben coincidir con components/Branding/data.ts)
// ─────────────────────────────────────────────
function hippo_brand_options() {
    return array(
        'sliders' => array(
            'elite_mass'         => array( 'Exclusivo', 'Popular' ),
            'serious_playful'    => array( 'Seria', 'Divertida' ),
            'conventional_rebel' => array( 'Convencional', 'Rebelde' ),
            'friend_authority'   => array( 'Amiga', 'Autoridad' ),
            'classic_innovative' => array( 'Madura y clásica', 'Joven e innovadora' ),
        ),
        'scale_points' => 7,
        'words' => array(
            'active'        => 'Activa',
            'safe'          => 'Segura',
            'creative'      => 'Creativa',
            'loyal'         => 'Leal',
            'diverse'       => 'Diversa',
            'expressive'    => 'Expresiva',
            'interactive'   => 'Interactiva',
            'friendly'      => 'Amigable',
            'teamwork'      => 'Trabajo en equipo',
            'ecological'    => 'Ecológica',
            'funny'         => 'Divertida',
            'competitive'   => 'Competitiva',
            'premium'       => 'Premium',
            'reserved'      => 'Reservada',
            'technological' => 'Tecnológica',
            'expensive'     => 'Costosa',
            'serious'       => 'Seria',
            'classic'       => 'Clásica',
        ),
        // id => array( label, color de fondo, color de borde )
        'buckets' => array(
            'most_important' => array( 'Lo más importante', '#F4511E', '#F4511E' ),
            'important'      => array( 'Importante', '#FFC700', '#FFC700' ),
            'less_important' => array( 'Menos importante', '#EEEEEE', '#EEEEEE' ),
            'exclude'        => array( 'No lo quiere transmitir', '#FFFFFF', '#C3C4C7' ),
        ),
        // id => array( label, color )
        'reactions' => array(
            'love' => array( 'Me encanta', '#F4511E' ),
            'like' => array( 'Podría ser', '#2BB8A3' ),
            'no'   => array( 'No va', '#1A2340' ),
        ),
        // id => array( label, archivo en /logos )
        'logos' => array(
            'emblem'          => array( 'Emblema', 'emblem.png' ),
            'abstract'        => array( 'Abstracto', 'abstract.png' ),
            'monogram'        => array( 'Monograma', 'monogram.png' ),
            'old_school'      => array( 'Old school', 'old-school.png' ),
            'imagotype'       => array( 'Imagotipo', 'imagotype.png' ),
            'stamp'           => array( 'Sello', 'stamp.png' ),
            'minimal'         => array( 'Minimalista', 'minimal.png' ),
            'letter_retro'    => array( 'Letra – retro', 'letter-retro.png' ),
            'lettering'       => array( 'Lettering', 'lettering.png' ),
            'mascot'          => array( 'Mascota', 'mascot.png' ),
            'word_logo'       => array( 'Logotipo', 'word-logo.png' ),
            'letter_symbolic' => array( 'Letra – simbólica', 'letter-symbolic.png' ),
            'letter_modern'   => array( 'Letra – moderna', 'letter-modern.png' ),
        ),
        'font_count' => 25,
        'max_stars'  => 5,
    );
}

// ─────────────────────────────────────────────
// CUSTOM POST TYPE: brand_discovery
// ─────────────────────────────────────────────
add_action( 'init', function () {
    register_post_type( 'brand_discovery', array(
        'labels' => array(
            'name'          => 'Brand Discovery',
            'singular_name' => 'Brand Discovery',
            'menu_name'     => 'Brand Discovery',
            'view_item'     => 'Ver respuestas',
            'edit_item'     => 'Respuestas de marca',
            'all_items'     => 'Todas las respuestas',
            'search_items'  => 'Buscar respuestas',
            'not_found'     => 'Todavía no hay respuestas.',
        ),
        'public'       => false,
        'show_ui'      => true,
        'show_in_menu' => true,
        'show_in_rest' => false,
        'menu_icon'    => 'dashicons-art',
        'supports'     => array( 'title' ),
        'capabilities' => array(
            'create_posts' => 'do_not_allow',
        ),
        'map_meta_cap' => true,
    ));
});

// ─────────────────────────────────────────────
// REST API ENDPOINT
// ─────────────────────────────────────────────
add_action( 'rest_api_init', function () {
    register_rest_route( 'hippo/v1', '/branding', array(
        'methods'             => 'POST',
        'callback'            => 'hippo_brand_handle_submission',
        'permission_callback' => 'hippo_brand_verify_user',
    ));
});

function hippo_brand_verify_user( $request ) {
    $user = wp_get_current_user();
    return ( $user && $user->ID !== 0 );
}

function hippo_brand_handle_submission( WP_REST_Request $request ) {
    $raw = $request->get_json_params();

    if ( empty( $raw ) || ! is_array( $raw ) ) {
        return new WP_Error( 'no_data', 'No se recibieron datos.', array( 'status' => 400 ) );
    }
    if ( ! isset( $raw['form'] ) || $raw['form'] !== 'branding_discovery' ) {
        return new WP_Error( 'wrong_form', 'Formulario no reconocido.', array( 'status' => 400 ) );
    }

    $data    = hippo_brand_sanitize( $raw );
    $contact = $data['contact'];

    if ( $contact['full_name'] === '' || ! is_email( $contact['email'] ) ) {
        return new WP_Error( 'missing_fields', 'Faltan el nombre o un email válido.', array( 'status' => 400 ) );
    }

    $title = $contact['full_name'];
    if ( $contact['company_name'] !== '' ) {
        $title .= ' · ' . $contact['company_name'];
    }
    $title .= ' — ' . current_time( 'Y-m-d H:i' );

    $post_id = wp_insert_post( array(
        'post_title'  => $title,
        'post_type'   => 'brand_discovery',
        'post_status' => 'publish',
    ), true );

    if ( is_wp_error( $post_id ) ) {
        return new WP_Error( 'insert_failed', 'No se pudo guardar la respuesta.', array( 'status' => 500 ) );
    }

    // Todo el formulario en un solo meta (array serializado). wp_slash evita
    // que update_post_meta borre barras invertidas del texto del cliente.
    update_post_meta( $post_id, 'brand_data', wp_slash( $data ) );

    // Campos sueltos para columnas y búsquedas.
    update_post_meta( $post_id, 'full_name', $contact['full_name'] );
    update_post_meta( $post_id, 'client_email', $contact['email'] );
    update_post_meta( $post_id, 'company_name', $contact['company_name'] );
    update_post_meta( $post_id, 'locale', $data['locale'] );

    return new WP_REST_Response( array(
        'success' => true,
        'message' => 'Respuestas recibidas correctamente.',
        'post_id' => $post_id,
    ), 201 );
}

// ─────────────────────────────────────────────
// SANITIZACIÓN — solo se guardan claves y valores conocidos
// ─────────────────────────────────────────────
function hippo_brand_text( $value ) {
    return is_string( $value ) ? trim( sanitize_textarea_field( $value ) ) : '';
}

function hippo_brand_line( $value ) {
    return is_string( $value ) ? trim( sanitize_text_field( $value ) ) : '';
}

function hippo_brand_list( $value, $max ) {
    return is_array( $value ) ? array_slice( array_values( $value ), 0, $max ) : array();
}

function hippo_brand_sanitize( $raw ) {
    $opt     = hippo_brand_options();
    $contact = ( isset( $raw['contact'] ) && is_array( $raw['contact'] ) ) ? $raw['contact'] : array();

    $clean = array(
        'locale'              => ( isset( $raw['locale'] ) && in_array( $raw['locale'], array( 'es', 'en' ), true ) ) ? $raw['locale'] : '',
        'contact'             => array(
            'full_name'    => hippo_brand_line( isset( $contact['full_name'] ) ? $contact['full_name'] : '' ),
            'company_name' => hippo_brand_line( isset( $contact['company_name'] ) ? $contact['company_name'] : '' ),
            'email'        => sanitize_email( isset( $contact['email'] ) && is_string( $contact['email'] ) ? $contact['email'] : '' ),
        ),
        'company_description' => hippo_brand_text( isset( $raw['company_description'] ) ? $raw['company_description'] : '' ),
        'values_beliefs'      => array(),
        'ideal_clients'       => array(),
        'personality'         => array(),
        'competition'         => array(),
        'values_priority'     => array(),
        'logo_styles'         => array(),
        'logo_comment'        => hippo_brand_text( isset( $raw['logo_comment'] ) ? $raw['logo_comment'] : '' ),
        'font_styles'         => array(),
        'font_comment'        => hippo_brand_text( isset( $raw['font_comment'] ) ? $raw['font_comment'] : '' ),
        'submitted_at'        => hippo_brand_line( isset( $raw['submitted_at'] ) ? $raw['submitted_at'] : '' ),
    );

    // 3. Valores y creencias (máx. 3)
    foreach ( hippo_brand_list( isset( $raw['values_beliefs'] ) ? $raw['values_beliefs'] : null, 3 ) as $item ) {
        if ( ! is_array( $item ) ) continue;
        $title = hippo_brand_line( isset( $item['title'] ) ? $item['title'] : '' );
        $desc  = hippo_brand_text( isset( $item['description'] ) ? $item['description'] : '' );
        if ( $title !== '' || $desc !== '' ) {
            $clean['values_beliefs'][] = array( 'title' => $title, 'description' => $desc );
        }
    }

    // 4. Clientes ideales (máx. 3)
    foreach ( hippo_brand_list( isset( $raw['ideal_clients'] ) ? $raw['ideal_clients'] : null, 3 ) as $item ) {
        $text = hippo_brand_text( $item );
        if ( $text !== '' ) $clean['ideal_clients'][] = $text;
    }

    // 5. Personalidad (1..7 por slider)
    $personality = ( isset( $raw['personality'] ) && is_array( $raw['personality'] ) ) ? $raw['personality'] : array();
    foreach ( array_keys( $opt['sliders'] ) as $slider ) {
        if ( isset( $personality[ $slider ] ) && is_numeric( $personality[ $slider ] ) ) {
            $n = (int) $personality[ $slider ];
            if ( $n >= 1 && $n <= $opt['scale_points'] ) $clean['personality'][ $slider ] = $n;
        }
    }

    // 6. Competencia (máx. 8)
    foreach ( hippo_brand_list( isset( $raw['competition'] ) ? $raw['competition'] : null, 8 ) as $item ) {
        if ( ! is_array( $item ) ) continue;
        $name = hippo_brand_line( isset( $item['name'] ) ? $item['name'] : '' );
        $url  = ( isset( $item['url'] ) && is_string( $item['url'] ) ) ? esc_url_raw( trim( $item['url'] ) ) : '';
        if ( $name !== '' || $url !== '' ) {
            $clean['competition'][] = array( 'name' => $name, 'url' => $url );
        }
    }

    // 7. Valores por prioridad (cada palabra en una sola caja)
    $priority = ( isset( $raw['values_priority'] ) && is_array( $raw['values_priority'] ) ) ? $raw['values_priority'] : array();
    $placed   = array();
    foreach ( array_keys( $opt['buckets'] ) as $bucket ) {
        $clean['values_priority'][ $bucket ] = array();
        foreach ( hippo_brand_list( isset( $priority[ $bucket ] ) ? $priority[ $bucket ] : null, count( $opt['words'] ) ) as $word ) {
            if ( is_string( $word ) && isset( $opt['words'][ $word ] ) && ! isset( $placed[ $word ] ) ) {
                $clean['values_priority'][ $bucket ][] = $word;
                $placed[ $word ] = true;
            }
        }
    }

    // 8. Estilos de logo
    foreach ( hippo_brand_list( isset( $raw['logo_styles'] ) ? $raw['logo_styles'] : null, count( $opt['logos'] ) ) as $item ) {
        if ( ! is_array( $item ) || ! isset( $item['id'], $item['reaction'] ) ) continue;
        if ( is_string( $item['id'] ) && isset( $opt['logos'][ $item['id'] ] )
            && is_string( $item['reaction'] ) && isset( $opt['reactions'][ $item['reaction'] ] ) ) {
            $clean['logo_styles'][ $item['id'] ] = $item['reaction'];
        }
    }

    // 9. Tipografías (font_01..font_25, 1..5 estrellas)
    foreach ( hippo_brand_list( isset( $raw['font_styles'] ) ? $raw['font_styles'] : null, $opt['font_count'] ) as $item ) {
        if ( ! is_array( $item ) || ! isset( $item['id'], $item['stars'] ) || ! is_string( $item['id'] ) ) continue;
        if ( preg_match( '/^font_(\d{2})$/', $item['id'], $m ) ) {
            $n     = (int) $m[1];
            $stars = is_numeric( $item['stars'] ) ? (int) $item['stars'] : 0;
            if ( $n >= 1 && $n <= $opt['font_count'] && $stars >= 1 && $stars <= $opt['max_stars'] ) {
                $clean['font_styles'][ $item['id'] ] = $stars;
            }
        }
    }

    return $clean;
}

// ─────────────────────────────────────────────
// COLUMNAS CUSTOM en la lista de admin
// ─────────────────────────────────────────────
add_filter( 'manage_brand_discovery_posts_columns', function ( $cols ) {
    return array(
        'cb'      => $cols['cb'],
        'title'   => 'Cliente',
        'email'   => 'Email',
        'empresa' => 'Empresa',
        'date'    => 'Fecha',
    );
});

add_action( 'manage_brand_discovery_posts_custom_column', function ( $col, $post_id ) {
    if ( $col === 'email' ) {
        $email = get_post_meta( $post_id, 'client_email', true );
        echo $email ? '<a href="mailto:' . esc_attr( $email ) . '">' . esc_html( $email ) . '</a>' : '—';
    }
    if ( $col === 'empresa' ) {
        $company = get_post_meta( $post_id, 'company_name', true );
        echo esc_html( $company ? $company : '—' );
    }
}, 10, 2 );

// ─────────────────────────────────────────────
// META BOXES — una por paso del formulario
// ─────────────────────────────────────────────
add_action( 'add_meta_boxes_brand_discovery', function () {
    $boxes = array(
        'contacto'    => array( '1. Datos de contacto', 'hippo_brand_box_contact' ),
        'empresa'     => array( '2. ¿Qué hace la compañía?', 'hippo_brand_box_company' ),
        'creencias'   => array( '3. Valores y creencias', 'hippo_brand_box_beliefs' ),
        'clientes'    => array( '4. Clientes ideales', 'hippo_brand_box_clients' ),
        'personalidad'=> array( '5. Personalidad de la marca', 'hippo_brand_box_personality' ),
        'competencia' => array( '6. Competencia', 'hippo_brand_box_competition' ),
        'prioridad'   => array( '7. Valores por prioridad', 'hippo_brand_box_priority' ),
        'logos'       => array( '8. Estilo de logo', 'hippo_brand_box_logos' ),
        'fuentes'     => array( '9. Estilo tipográfico', 'hippo_brand_box_fonts' ),
        'json'        => array( 'Datos crudos (JSON)', 'hippo_brand_box_json' ),
    );
    foreach ( $boxes as $id => $box ) {
        add_meta_box( 'hippo_brand_' . $id, $box[0], $box[1], 'brand_discovery', 'normal', 'default' );
    }
});

function hippo_brand_data( $post ) {
    $data = get_post_meta( $post->ID, 'brand_data', true );
    return is_array( $data ) ? $data : array();
}

function hippo_brand_empty() {
    echo '<p class="hb-empty">Sin respuesta.</p>';
}

function hippo_brand_box_contact( $post ) {
    $d = hippo_brand_data( $post );
    $c = isset( $d['contact'] ) ? $d['contact'] : array();
    $rows = array(
        'Nombre'  => isset( $c['full_name'] ) ? esc_html( $c['full_name'] ) : '',
        'Email'   => ! empty( $c['email'] ) ? '<a href="mailto:' . esc_attr( $c['email'] ) . '">' . esc_html( $c['email'] ) . '</a>' : '',
        'Empresa' => ! empty( $c['company_name'] ) ? esc_html( $c['company_name'] ) : '',
        'Idioma'  => ! empty( $d['locale'] ) ? esc_html( strtoupper( $d['locale'] ) ) : '',
        'Enviado' => ! empty( $d['submitted_at'] ) ? esc_html( $d['submitted_at'] ) : '',
    );
    echo '<table class="hb-table">';
    foreach ( $rows as $label => $html ) {
        echo '<tr><th>' . esc_html( $label ) . '</th><td>' . ( $html !== '' ? $html : '—' ) . '</td></tr>';
    }
    echo '</table>';
}

function hippo_brand_box_company( $post ) {
    $d = hippo_brand_data( $post );
    if ( empty( $d['company_description'] ) ) return hippo_brand_empty();
    echo '<p class="hb-text">' . esc_html( $d['company_description'] ) . '</p>';
}

function hippo_brand_box_beliefs( $post ) {
    $d = hippo_brand_data( $post );
    if ( empty( $d['values_beliefs'] ) ) return hippo_brand_empty();
    echo '<ol class="hb-list">';
    foreach ( $d['values_beliefs'] as $item ) {
        echo '<li><strong>' . esc_html( $item['title'] !== '' ? $item['title'] : '(sin título)' ) . '</strong>';
        if ( $item['description'] !== '' ) {
            echo '<p class="hb-text">' . esc_html( $item['description'] ) . '</p>';
        }
        echo '</li>';
    }
    echo '</ol>';
}

function hippo_brand_box_clients( $post ) {
    $d = hippo_brand_data( $post );
    if ( empty( $d['ideal_clients'] ) ) return hippo_brand_empty();
    echo '<ol class="hb-list">';
    foreach ( $d['ideal_clients'] as $client ) {
        echo '<li><p class="hb-text">' . esc_html( $client ) . '</p></li>';
    }
    echo '</ol>';
}

function hippo_brand_box_personality( $post ) {
    $d   = hippo_brand_data( $post );
    $opt = hippo_brand_options();
    $p   = isset( $d['personality'] ) ? $d['personality'] : array();
    echo '<div class="hb-sliders">';
    foreach ( $opt['sliders'] as $id => $labels ) {
        $value = isset( $p[ $id ] ) ? (int) $p[ $id ] : 0;
        echo '<div class="hb-slider">';
        echo '<span class="hb-slider-label hb-left">' . esc_html( $labels[0] ) . '</span>';
        echo '<span class="hb-dots">';
        for ( $i = 1; $i <= $opt['scale_points']; $i++ ) {
            echo '<span class="hb-dot' . ( $i === $value ? ' is-on' : '' ) . '"></span>';
        }
        echo '</span>';
        echo '<span class="hb-slider-label">' . esc_html( $labels[1] ) . '</span>';
        echo '<span class="hb-slider-value">' . ( $value ? esc_html( $value . '/' . $opt['scale_points'] ) : 'sin respuesta' ) . '</span>';
        echo '</div>';
    }
    echo '</div>';
}

function hippo_brand_box_competition( $post ) {
    $d = hippo_brand_data( $post );
    if ( empty( $d['competition'] ) ) return hippo_brand_empty();
    echo '<ul class="hb-list">';
    foreach ( $d['competition'] as $c ) {
        echo '<li><strong>' . esc_html( $c['name'] !== '' ? $c['name'] : '(sin nombre)' ) . '</strong>';
        if ( $c['url'] !== '' ) {
            echo ' — <a href="' . esc_url( $c['url'] ) . '" target="_blank" rel="noopener noreferrer">' . esc_html( $c['url'] ) . '</a>';
        }
        echo '</li>';
    }
    echo '</ul>';
}

function hippo_brand_box_priority( $post ) {
    $d      = hippo_brand_data( $post );
    $opt    = hippo_brand_options();
    $vp     = isset( $d['values_priority'] ) ? $d['values_priority'] : array();
    $placed = array();

    echo '<div class="hb-buckets">';
    foreach ( $opt['buckets'] as $id => $bucket ) {
        $words = isset( $vp[ $id ] ) ? $vp[ $id ] : array();
        echo '<div class="hb-bucket" style="background:' . esc_attr( $bucket[1] ) . ';border-color:' . esc_attr( $bucket[2] ) . '">';
        echo '<div class="hb-bucket-title">' . esc_html( $bucket[0] ) . '</div>';
        foreach ( $words as $w ) {
            $placed[ $w ] = true;
            echo '<span class="hb-chip">' . esc_html( isset( $opt['words'][ $w ] ) ? $opt['words'][ $w ] : $w ) . '</span>';
        }
        if ( empty( $words ) ) echo '<span class="hb-muted">—</span>';
        echo '</div>';
    }
    echo '</div>';

    $unplaced = array_diff_key( $opt['words'], $placed );
    if ( $unplaced ) {
        echo '<p class="hb-muted" style="margin-top:12px">Sin ubicar: ' . esc_html( implode( ', ', $unplaced ) ) . '</p>';
    }
}

function hippo_brand_box_logos( $post ) {
    $d      = hippo_brand_data( $post );
    $opt    = hippo_brand_options();
    $styles = isset( $d['logo_styles'] ) ? $d['logo_styles'] : array();

    if ( empty( $styles ) ) {
        hippo_brand_empty();
    } else {
        foreach ( $opt['reactions'] as $reaction => $meta ) {
            $ids = array_keys( $styles, $reaction, true );
            if ( empty( $ids ) ) continue;
            echo '<h4 class="hb-group" style="color:' . esc_attr( $meta[1] ) . '">' . esc_html( $meta[0] ) . ' (' . count( $ids ) . ')</h4>';
            echo '<div class="hb-grid">';
            foreach ( $ids as $id ) {
                $logo = $opt['logos'][ $id ];
                echo '<figure class="hb-card" style="border-color:' . esc_attr( $meta[1] ) . '">';
                echo '<img src="' . esc_url( HIPPO_BRAND_ASSETS . '/logos/' . $logo[1] ) . '" alt="' . esc_attr( $logo[0] ) . '" loading="lazy">';
                echo '<figcaption>' . esc_html( $logo[0] ) . '</figcaption>';
                echo '</figure>';
            }
            echo '</div>';
        }
    }

    if ( ! empty( $d['logo_comment'] ) ) {
        echo '<p class="hb-comment"><strong>Comentario:</strong> ' . esc_html( $d['logo_comment'] ) . '</p>';
    }
}

function hippo_brand_box_fonts( $post ) {
    $d     = hippo_brand_data( $post );
    $opt   = hippo_brand_options();
    $fonts = isset( $d['font_styles'] ) ? $d['font_styles'] : array();

    if ( empty( $fonts ) ) {
        hippo_brand_empty();
    } else {
        arsort( $fonts ); // más estrellas primero
        echo '<div class="hb-grid hb-grid-wide">';
        foreach ( $fonts as $id => $stars ) {
            $n = substr( $id, 5 ); // "font_07" -> "07"
            echo '<figure class="hb-card">';
            echo '<img src="' . esc_url( HIPPO_BRAND_ASSETS . '/fonts/font-' . $n . '.png' ) . '" alt="' . esc_attr( 'Tipografía ' . (int) $n ) . '" loading="lazy">';
            echo '<figcaption>Tipografía ' . (int) $n . ' <span class="hb-stars">'
                . str_repeat( '★', (int) $stars ) . '<span class="hb-stars-off">' . str_repeat( '★', $opt['max_stars'] - (int) $stars ) . '</span>'
                . '</span></figcaption>';
            echo '</figure>';
        }
        echo '</div>';
    }

    if ( ! empty( $d['font_comment'] ) ) {
        echo '<p class="hb-comment"><strong>Comentario:</strong> ' . esc_html( $d['font_comment'] ) . '</p>';
    }
}

function hippo_brand_box_json( $post ) {
    $d = hippo_brand_data( $post );
    echo '<details><summary>Ver JSON</summary><pre class="hb-json">'
        . esc_html( wp_json_encode( $d, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ) )
        . '</pre></details>';
}

// ─────────────────────────────────────────────
// ESTILOS EN EL ADMIN
// ─────────────────────────────────────────────
add_action( 'admin_head', function () {
    $screen = get_current_screen();
    if ( ! $screen || $screen->post_type !== 'brand_discovery' ) return;
    ?>
    <style>
        #poststuff .postbox { border: 1px solid #e0e0e0; border-radius: 6px; overflow: hidden; }
        #poststuff .postbox h2 { background: #f8f8f8; border-bottom: 1px solid #e0e0e0; padding: 10px 14px; font-size: 13px; }
        #submitdiv { display: none; }

        .hb-empty, .hb-muted { color: #8c8f94; font-style: italic; margin: 0; }
        .hb-text { margin: 4px 0 0; white-space: pre-wrap; line-height: 1.6; }
        .hb-table { width: 100%; border-collapse: collapse; }
        .hb-table th { width: 140px; text-align: left; padding: 6px 10px 6px 0; color: #3c434a; vertical-align: top; }
        .hb-table td { padding: 6px 0; }
        .hb-list { margin: 0 0 0 20px; }
        .hb-list li { margin-bottom: 12px; }

        .hb-sliders { display: flex; flex-direction: column; gap: 10px; }
        .hb-slider { display: grid; grid-template-columns: 150px auto 150px 90px; align-items: center; gap: 12px; }
        .hb-slider-label.hb-left { text-align: right; }
        .hb-dots { display: flex; gap: 10px; align-items: center; }
        .hb-dot { width: 12px; height: 12px; border-radius: 50%; border: 2px solid #c3c4c7; background: #fff; }
        .hb-dot.is-on { width: 18px; height: 18px; border-color: #9bd62a; background: #b6f23a; }
        .hb-slider-value { color: #8c8f94; font-size: 12px; }

        .hb-buckets { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .hb-bucket { border: 2px solid; border-radius: 8px; padding: 12px; min-height: 70px; }
        .hb-bucket-title { font-weight: 600; margin-bottom: 8px; color: #1a2340; }
        .hb-chip { display: inline-block; background: #fff; border: 1px solid rgba(0,0,0,.1); border-radius: 999px; padding: 3px 10px; margin: 0 6px 6px 0; font-weight: 600; color: #1a2340; }

        .hb-group { margin: 14px 0 8px; font-size: 13px; }
        .hb-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; }
        .hb-grid-wide { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
        .hb-card { margin: 0; border: 2px solid #e0e0e0; border-radius: 8px; overflow: hidden; background: #fff; }
        .hb-card img { display: block; width: 100%; height: 110px; object-fit: contain; background: #fafafa; }
        .hb-grid-wide .hb-card img { height: 70px; }
        .hb-card figcaption { padding: 6px 8px; font-weight: 600; display: flex; justify-content: space-between; gap: 6px; }
        .hb-stars { color: #FFC700; letter-spacing: 1px; }
        .hb-stars-off { color: #dcdcde; }
        .hb-comment { margin-top: 14px; white-space: pre-wrap; }
        .hb-json { max-height: 400px; overflow: auto; background: #f6f7f7; padding: 10px; border-radius: 4px; }
    </style>
    <?php
});

// ================================================================
// FIN HIPPO BRAND DISCOVERY
// ================================================================
