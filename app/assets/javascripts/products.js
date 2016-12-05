$(document).ready(function() {
  var $productName = $('#product-name')
  var $productBasePrice = $('#product-base-price')
  var $productDescription = $('#product-description')
  var $productQuantityOnHand = $('#product-quantity-on-hand')
  var $productColor = $('#product-color')
  var $productWeight = $('#product-weight')
  var $productOtherAttributes = $('#product-other-attributes  ')
  var $showProduct = $('#show-product')
  var $productList = $('.product-list')
  var $getProduct = $('#get-product')
  var $productForm = $('#add-product-form');
  var back = $('.back');
  var newProduct = $('.new-product')

  var BASEURL = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1';

  // NEW button
  newProduct.click(function(){
    $productList.hide();
    $showProduct.hide();
    $productForm.show();
  })
  // BACK button
  back.click(function(){
    $productList.show();
    $showProduct.hide();
    $productShow.empty();
  })

  // EXISTING PRODUCT CARDS
  function loadProducts() {
    var $products = $('#products')
    $productForm.hide();
    $.ajax({
      type: 'GET',
      url: BASEURL + '/products',
      dataType: 'JSON',
    }).success(function(data) {
      for(var i = 0; i < data.length; i++ ) {
        var product = data[i];
        $products.append("<div>" +
          "<div id='" + product.id + "'class='col s12 m4'>" +
            "<div class='card'>" +
              "<div class='card-content'>" +
                "<span class='card-title'>" + product.name + "</span>" +
                "<p>" + "Description: " + product.description + "</p>" +
                "<p>" + "Price: " + "$" + product.base_price + "</p>" +
                "<button class='op-btn btn show-product'>" + "<i class='material-icons'>" + "visibility" + "</i>" + "</button>" +
                "<button class='op-btn btn edit-product'>" + "<i class='material-icons'>" + "edit" + "</i>" + "</button>" +
                "<button class='op-btn btn delete-product'>" + "<i class='material-icons'>" + "delete" + "</i>" + "</button>" +
              "</div>" +
            "</div>" +
          "</div>" +
        "</div>");
      }
    }).fail(function(data) {
      alert('This is a graceful message. Beware of the 404!!!!!')
    });
  }


  //EDIT PRODUCTS
  $(document).on('click', '.edit-product', function(e) {
      e.preventDefault();
      $productForm.show();
      $productList.hide();
      var productId = $(this).parent().parent().parent().attr('id');
      $.ajax({
      type  : 'GET',
      url: BASEURL + '/products/' + productId,
      dataType: 'JSON'
    }).success(function(data) {
      $productName.val(data.name).focus();
      $productBasePrice.val(data.base_price);
      $productDescription.val(data.description);
      $productQuantityOnHand.val(data.quantity_on_hand);
      $productColor.val(data.color);
      $productWeight.val(data.weight);
      $productOtherAttributes.val(data.other_attributes);
      $productForm.attr('data-product-id', productId);
    }).fail(function(data) {
      alert('This is a graceful message.' + data + '  Beware of the 404!!!!!')
    })
  });

  // DELETE PRODUCTS
  $(document).on('click', '.delete-product', function() {
    var productId = $(this).parent().parent().parent().attr('id');
    $.ajax({
      type: 'DELETE',
      url: BASEURL + '/products/' + productId,
      dataType: 'JSON'
    }).success(function(data) {
      $('#' + productId).remove();
    }).fail(function(data) {
      alert('This is a graceful message. Beware of the 404!!!!!')
    })
  });


  // SHOW PRODUCT
  $(document).on('click', '.show-product', function() {
    $productForm.hide();
    $productList.hide();
    $showProduct.show();
    var productId = $(this).parent().parent().parent().attr('id');
    $.ajax({
      type: 'GET',
      url: BASEURL + '/products/' + productId,
      dataType: 'JSON'
    }).success(function(data) {
      var product = data
      $showProduct.append("<div>" +
        "<div id='" + product.id + "'class='col s12 m12'>" +
          "<div class='card'>" +
            "<div class='card-content'>" +
              "<span class='card-title'>" + product.name + "</span>" +
              "<p>" + "Description: " + product.description + "</p>" +
              "<p>" + "Price: " + "$" + product.base_price + "</p>" +
              "<p>" + "Quantity: " + product.quantity_on_hand + "</p>" +
              "<p>" + "Color: " + product.color + "</p>" +
              "<p>" + "Weight: " + product.weight + "</p>" +
              "<p>" + "Other Attributes: " + product.other_attributes + "</p>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>");

    }).fail(function(data) {
      alert('This is a graceful message.' + data + '  Beware of the 404!!!!!')
    })
  });


  // SUBMIT NEW PRODUCTS & SUBMIT EDIT
  $productForm.submit(function(e) {
    e.preventDefault();
    var requestType, requestUrl;

    if($(this).data('product-id')) {
      requestType = 'PUT';
      requestUrl = BASEURL + '/products/' + $(this).data('product-id');
    } else {
      requestType = 'POST';
      requestUrl = BASEURL + '/products';
    }
    $.ajax({
      type: requestType,
      url: requestUrl,
      dataType: 'JSON',
      data: {product: {name: $productName.val(), base_price: $productBasePrice.val(),
        description: $productDescription.val(), quantity_on_hand: $productQuantityOnHand.val(),
        color: $productColor.val(), weight: $productWeight.val(), other_attributes: $productOtherAttributes.val()
       } }
    }).success(function(data) {
      $productList.show();
      $productForm.hide();
      // loadProducts();
    }).fail(function(data) {
      alert('This is a graceful message. Beware of the 404!!!!!')
    });
  })

  loadProducts();
});
