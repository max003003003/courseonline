class ProfileEditController{
    constructor( $me, $state ,$scope ){
        'ngInject'
        this.$me = $me
        this.$state = $state
        this.$scope=$scope
        this.name=''
        this.aboutMe=''
        this.photo=''
        $me.getProfile()
                .first()
                .subscribe(
                    (profile)=>{
                   console.log(profile)
                   this.name=profile.name
                   this.aboutMe=profile.aboutMe  
                   this.photo = profile.photo            
            }
        )
       
    }
    save() {
    //    this.saving= true
    //    this.$me.saveProfile( {
    //        name: this.name,
    //        aboutMe: this.aboutMe
    //    }) 
    //   .then(() => {
    //             this.saving=false
    //             this.$state.go('profile')                
    //         }) 
      this.saveing = true
      this.$me.saveProfile({
            name: this.name,
            aboutMe: this.aboutMe,
            photo: this.photo
             }).subscribe(
                    (x) =>{
                       this.saving=false
                       this.$state.go('profile')
                    }
             )  
            //    this.saving=false
            //   this.$state.go('profile')   


            //  .then(()=>{
            //      this.saving=false
            //      this.$state.go('profile')      
            //  })
        
                   
           
    }
    selectedFile(file){
        const f = file.files[0]
        if(!f) return 
        else{
             this.$me.upload(f)
                .subscribe(
                    (res) =>{                       
                        this.photo = res
                    }
                )
          }
   
       //
    }
}

export default{
    selector: 'profileEdit',
    template:  require('./profile-edit.component.html'),
    controller: ProfileEditController
}