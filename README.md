# Dynamic Pagination

demo link: https://qianzhong516.github.io/dynamicPagination/

## Examples
* <1, 2, 3, 4, 5, ... 10>, current = 1
* <1, ... 6, 7, 8, 9, 10>, current = 10
* <1, ... 2, 3, 4, 5, 6, ... 10>, current = 4

## Usage:
```javascript
new Pagination('demo');
```
`demo` is the id of the element you want to append the pagination element to.

## Reference
Variable | Usage
--------- | --------
appendId | id of the element you want to append to 
pageSize | max page number
maxShown | max amount of numbers shown in the `list` body.