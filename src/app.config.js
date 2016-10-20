import firebase from 'firebase'

export function Config($stateProvider ,$urlRouterProvider,$locationProvider){
   'ngInject'
   firebase.initializeApp({
    apiKey: 'AIzaSyAiJtzD4fiDUhx8qq0E2JNNfEkXBu8hMJI',
    authDomain: 'test-30906.firebaseapp.com',
    databaseURL: 'https://test-30906.firebaseio.com',
    storageBucket: 'test-30906.appspot.com',
    messagingSenderId: '393840517251'
  })  
   
    $locationProvider.html5Mode(true)
    $urlRouterProvider.otherwise('/')
    $stateProvider
        .state('auth', {   
            abstrack: true,     
            template:require('./views/auth.html'),
            resolve:{
                redirectToHomeIfAuth
            }
        
        })
        .state('auth.signin', {
            url:'/',
            template: require('./views/signin.html'),
            controller:  'SignInController',
            controllerAs: 'vm'

        })
        .state('auth.register', {
            url:'/register',
             template:require('./views/register.html')
             
        })
        .state('layout',{
            template: require('./views/layout.html'),
            controller: 'LayoutController',
            controllerAs: 'vm',
            resolve: {
                redirectToAuthIfNotAuth
            }
        })
        .state('home', {
            url:'/home',
            parent: 'layout',
            template:'<home></home>'            
        })
        .state('profile',{
            url:'/profile',
            parent: 'layout',  
            template: '<profile></profile>',    
        })
        .state('edit-profile',{
            url:'/parent/edit',
            parent: 'layout',
            template: '<profile-edit></profile-edit>'   
        })
        .state('course-create',{
            url:'/course/create',
            parent:'layout',
            template: '<course-create></course-create>'
        })
        .state('course-view',{
            url:'/course/:id',
            parent: 'layout',
            template: '<course-view></course-view>'
        })
        .state('course-edit',{
            url: '/course/:id/edit',
            parent:'layout',
            template: '<course-edit></course-edit>'
        })
        .state('course-chat',{
            url: '/course/:id/chat',
            parent:'layout',
            template: '<course-chat></course-chat>'
        })
       
}

function redirectToHomeIfAuth($q,$state,$firebase){
    'ngInject'
    
   const defer = $q.defer() 
   $firebase.currentUser()
        .subscribe(
            (user) => {
                if(user) { 
                    defer.reject()                 
                    $state.go('home')
                }else {
                    defer.resolve()
                }
            }
        )
        return defer.promise
   }
function redirectToAuthIfNotAuth( $q, $state, $firebase){
    'ngInject'      
 const defer = $q.defer() 
  $firebase.currentUser()
        .subscribe(
            (user) => {
                if(!user) {
                    defer.reject()
                    $state.go('auth.signin')
                }else{
                    defer.resolve()
                }
            }
        )
        return defer.promise

}