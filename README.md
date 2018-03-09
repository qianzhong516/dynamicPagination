# dynamicPagination-jquery
dynamic toggled pagination with jquery (ex: <1 2 3 4 ... 11> => <1 ... 3 4 5 ... 11>)<br/>
<h2>User Guide:</h2>
<p>Feel free to use this piece of code with ajax. The maximum page number and the display amount of numbers in the list can both be customized.</p>
<h3>The idea about the code:</h3>
<p>I declared an output array which stores all the supposed outputs after user clicks a number. Basically, just pop all the list items out of the list and insert the new elements into it, then you have a new list. It could be tricky by solving this way, the things you need to pay attention to are:
<ol>
  <li>Remember to off bind the click event on pre and next button.</li>
  <li>class="active" needs to be stored then recovered in the new list.</li>
</ol>
</p>

<p>Hope you have fun with it XD</p>
