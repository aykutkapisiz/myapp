/** 
	AYKUT KAPISIZ
	0530 524 00 29
	aykutkapisiz@gmail.com
**/
var jsonURL = 'assets/js/app.json';

app = angular.module('mynetApp', ['ngRoute']); 

app.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'PList.html',
        controller: 'mynetController'
    })
    .when('/detail/:id', {
        templateUrl : 'PDetail.html',
        controller: 'mynetDetailController'
    })
    .otherwise({
        redirectTo: '/'
    });
});

app.controller('mynetController', function ($scope, $http) {

    // json dosyamizdan datamizi cektik.
    $http.get(jsonURL).then(function(response){
        $scope.slides = response.data.section1; 
        $scope.lightbox = response.data.section2;    
    });
    
}); 

// slider iceriklerinin son item'i yuklendikten sonra, icerigi slider yaptik.
app.directive('slidesDirective', function(){
    return function(scope, element, attrs) {
        if (scope.$last){
            $('.owl-carousel').owlCarousel({
                items:2,
                loop: true,
                nav:true,
                responsive: {
                    0:{ items:1 },
                    600:{ items:2 },
                    1000:{ items:2 }
                }
            });
            
        }
    }
});

// fancybox iceriklerinin son item'i yuklendikten sonra, icerikleri popup'ta gosterdik.
app.directive('lightboxDirective', function(){
    return function(scope, element, attrs) {
        if (scope.$last){
            var $fancyApp = $("[data-fancybox]");
            $fancyApp.fancybox({
                errorTpl : '<div class="fancybox-error"><p>Gorsel yuklenemedi, detay sayfasina yonlendiriliyorsunuz...<p></div>',
                afterShow: function(instance, slide) { 
                    if(instance.current.hasError != undefined || instance.current.hasError == true){
                        instance.close(); 
                        //debugger; 
                        var itemIndex = instance.$lastFocus[0].dataset.index;
                        console.log(itemIndex);
                        location.href = location.href + 'detail/' + itemIndex;
                    }
                }
            });            
        }
    }
});  
 
app.controller('mynetDetailController', function ($scope, $routeParams, $http) {
    var id = $routeParams.id;
    console.log(id);

    $http.get(jsonURL).then(function(response){  
        $scope.image = response.data.section2[id].media["480x270"];
        $scope.title = response.data.section2[id].title;
        $scope.content = response.data.section2[id].body;
        $scope.publishDate = response.data.section2[id].datePublished;
        $scope.category = response.data.section2[id].categoryName;
        $scope.url = response.data.section2[id].url;
    });
});