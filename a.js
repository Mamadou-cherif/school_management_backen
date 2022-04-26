// Class expression
let a = class {
    constructor(method1, method2) {
       this.method1 = method1;
       this.method2= method2;
     }
   };
   
   // Class declaration
   class b {
     constructor(method1, method2) {
       this.method1 = method1;
       this.method2= method2;
     }
     ajout(){
         console.log("fuck you cherif")
     }
   }

   module.exports={
       a,b
   }