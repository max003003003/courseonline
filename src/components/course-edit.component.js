class CourseEditController {
    constructor($course, $stateParams, $firebase, $state){
        'ngInject'

           
        this.$firebase = $firebase
        this.$course=$course
        this.courseId = $state.params.id
        this.course = null
        this.$state=$state
        this.course$ = this.$course.get(this.courseId)
            .first()
            .subscribe(
                (course) => {
                    this.course = course
                  }
            )
    }

    submit (model){
       this.$course.save(this.courseId,model)
        .subscribe(
            ()=>{
            this.$state.go('course-view',{ id: this.courseId })
            }
        )
    }

}
export default {
    selector: 'courseEdit',
    template: require('./course-edit.component.html'),
    controller: CourseEditController
}