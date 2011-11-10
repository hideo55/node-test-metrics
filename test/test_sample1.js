function foo(bar) {
  if(bar) {
    (function(baz){
      baz += 'qux';
      console.log(baz);
    })(bar);
  }
}