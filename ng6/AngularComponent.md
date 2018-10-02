# Angular Component

 <!--
 1. https://angular.io/guide/architecture
 2. http://csharp-video-tutorials.blogspot.com/2017/05/angular-2-components.html

  -->
Angular follows a clean modular architecture . A complex Angular web application user interface can be divided as- .

- **MODULES**    : are the basic building blocks in an angular application .Modules logically group one or more **components** and provide a   
                   compilation context for it  
                 
- **COMPONENTS** : represent building blocks for UI  

- **SERVICES**    : used to share  data and  logic between componenets

This chapter discusses how to create and use components in an Angular 6 application.
  
  

Angular splits complex application UI into reusable components . So we can think of an angular application as nothing but a bunch of components as shown in the diagram below.Every angular application must have at least one component .Components work together in harmony to provide great user experience.

** diag-1**


## Building blocks of a Component

A component itself is made up of three pieces
** diag 2**

1. Template :is created using HTML. It acts an interface to accept user input.
2. Class :is created with Typescript.This defines the functionality of a component. It exposes methods and properties of a component.
3. Metadata:It binds a template with a class. It is created using decorator function..We will use *@Component()* decorator


## Syntax to create a component

- Create a **class** in typescript and add properties .Following shows a class `TutsTeacherHelloComponent.ts`  and a property `messsage`.The class should be exported so that it becomes public and can be accessed by other classes in the application.

```javascript
export class TutsTeacherHelloComponent {

    message:String;
    constructor(){
        this.message = "TutorialsTeacher says ,Welcome to Angular6 Components "
    }
}

```

- Create a **template** file `TutsTeacherHelloComponent.html`. The `h1` tag embeds the value of the  `message` property in the `TutsTeacherHelloComponent ` class.

```html
<section>
  <h1>{{message}}</h1>
</section>
```

- Add **metadata** to the class created . The decorator function @Component() is used to bind the template and the class.

 ```javascript
 import { Component } from "@angular/core";

@Component({
    templateUrl:'TutsTeacherHelloComponent.html',
    selector:'tt-hello'
})
export class TutsTeacherHelloComponent {

    message:String;
    constructor(){
        this.message = "TutorialsTeacher says ,Welcome to Angular6 Components "
    }
}
 ```

 The @Component() function takes in an object `{}` as parameter . The common properties of the object is shown below

|Sr No | Property | Description       |
|:----:|:--------- |:-----------------|
| 1    |  templateUrl |The URL of a template file for an Angular component. If provided, do not supply an inline template using template.   |
| 2    | selector  |The CSS selector that identifies this directive in a template and triggers instantiation of the directive|
| 3   | styleUrls  |One or more URLs for files containing CSS stylesheets to use in this component|
| 4   | template  |An inline template for an Angular component. If provided, do not supply a template file using templateUrl.|
| 5  | styles  |One or more inline CSS stylesheets to use in this component.|

## Register the Component in AppModule and Execute the App

- Register the created component `TutsTeacherHelloComponent`  in the **AppModule** (created by the Angular CLI) of the project as given below

```javascript
 import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TutsTeacherHelloComponent } from '../TutorialsTeacher/TutsTeacherHelloComponent';

@NgModule({
  declarations: [
    TutsTeacherHelloComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [TutsTeacherHelloComponent]
})
export class AppModule { }

```
The `TutsTeacherHelloComponent` is or root component of the module.

- The Angular CLI creates an **index.html** page . To execute and view how the component looks in the browser .We need to use the selector **tt-hello** in index.html as below.

```html
  <body>
  <tt-hello></tt-hello>
 </body>

```

-- Finally run the application using angular cli using `ng serve` command .Open the browser type url `http://localhost:4200/` and verify the output as below.

![1_component](https://user-images.githubusercontent.com/9062443/46330404-721c7e80-c630-11e8-9419-67476e9764e1.png)
