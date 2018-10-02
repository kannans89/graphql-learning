# Angular Component

 <!--
 1. https://angular.io/guide/architecture
 2. http://csharp-video-tutorials.blogspot.com/2017/05/angular-2-components.html

  -->
Angular follows a clean modular architecture . A complex application web page can be divided into the following .

- Modules
- Components
- Services

**Modules** are the basic building blocks in an angular application .Modules logically group one or more **components** and provide a compilation context for it.Components uses **services** to  share  data and  logic.

The core idea of angular is to build components.
Angular splits complex application UI into reusable components . So we can think an angular application as nothing but a bunch of components as shown in the diagram below.

**todo**

Every angular application must have at least one component wrapped in a module . The root component and the associated components builds a hierarchal tree . Components works together in harmony to provide the user great  experience.

## Building blocks of a Component

A component itself is made up of three pieces

1. Template
2. Class
3. Metadata

**Template** is created using html.This includes binding expressions and directives.  
**Class** is created with Typescript.This includes methods and properties a component exposes.  
**Metadata** is created with decorator.Decorators are functions which give extra meaning to class.We will use *@Component()* decorator.

## Syntax to create a component

- create a **class** in typescript and add properties .Following shows a class `TutsTeacherHelloComponent.ts`  and a property `messsage`.The class has to be exported so that it becomes public and can be accessed in other

```javascript
export class TutsTeacherHelloComponent {

    message:String;
    constructor(){
        this.message = "TutorialsTeacher says ,Welcome to Angular6 Components "
    }
}

```

- Create a **template** file `TutsTeacherHelloComponent.html`. Inside the `h1` tag we are binding the value from `message` property.

```html
<section>
  <h1>{{message}}</h1>
</section>
```

- Add **metadata** to the class created . To bring relation between the template and the class created we use the decorator function @Component() as below. 

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

## Register the Component and Execute the App

- Register the created component `TutsTeacherHelloComponent`  in the default module **AppModule** of the project as given below

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

It is clear that `TutsTeacherHelloComponent` is the starting component or root component of the module.

- The Angular CLI creates an **index.html** page . To execute and view how the component looks in the browser .We need to use the selector **tt-hello** in index.html as below.

```html
  <body>
  <tt-hello></tt-hello>
 </body>

```

-- Finally run the application using angular cli using `ng serve` command .Open the browser type url `http://localhost:4200/` and verify the output as below.

![1_component](https://user-images.githubusercontent.com/9062443/46330404-721c7e80-c630-11e8-9419-67476e9764e1.png)