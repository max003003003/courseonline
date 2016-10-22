import { Observable } from 'rxjs'
class ProfileController {
    constructor($me){
         'ngInject'
         
         this.name =''
         this.aboutMe=''
         this.photo=''
         this.courses=[]
         this.isInstructor = false

        this.profile$ =  Observable.combineLatest(
             $me.getProfile(),
             $me.myOwnCourse()
         )
            .subscribe(
                ([profile,courses]) => {
                   this.name=profile.name
                   this.aboutMe=profile.aboutMe  
                   this.isInstructor=profile.isInstructor
                   this.photo = profile.photo 
                   this.courses = courses
                         
                }
            )   

            // $me.course()
            //     .subscribe(
            //         (course) => {
            //             console.log(course)
            //         }
            //     )

 
    }   
    $onDestroy(){
        this.profile$.unsubscribe()

    }

}
export default {
    selector: 'profile',
    template: require('./profile.component.html'),
    controller: ProfileController,
}