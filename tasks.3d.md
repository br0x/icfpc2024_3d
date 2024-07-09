========

TASK1:

# Input
  `1 <= A <= 100`

# Output
  The factorial of `A`.
  `A! = 1 * 2 * .. * (A - 1) * A`

# Example
  * `A = 5`
    `Answer = 120`


acc := 1
c := A
again:

acc = acc * c
c = c - 1
if c # 1 goto again

output acc






=================================

SEND: get 3d2

# Input
  `-100 <= A <= 100`

# Output
  The absolute value of `A`.

# Example
  * `A = 3`
    `Answer = 3`
  * `A = -6`
    `Answer = 6`

=================================

SEND: get 3d3

# Input
  `-100 <= A <= 100`

# Output
  The sign of `A`, which is `-1` for negative numbers, `0` for `0`, and `1` for positive numbers.

# Example
  * `A = 3`
    `Answer = 1`
  * `A = -6`
    `Answer = -1`

=================================

SEND: get 3d4
# Input
  `-100 <= A <= 100` and `-100 <= B <= 100`

# Output
  The maximum of `A` and `B`.

# Example
  * `A = 3`
    `B = 7`
    `Answer = 7`
  * `A = -2`
    `B = -6`
    `Answer = -2`

=================================

SEND: get 3d5
# Input
  `1 <= A <= 500` and `1 <= B <= 500`

# Output
  The least common multiple (LCM) of `A` and `B`, e.g. the smallest positive number that is divisible by both `A` and `B`.

# Example
  * `A = 3`
    `B = 7`
    `Answer = 21`
  * `A = 2`
    `B = 6`
    `Answer = 6`

=================================

SEND: get 3d6
# Input
  `2 <= A <= 500`

# Output
  `1` if `A` is a prime number, and `0` otherwise.

# Example
  * `A = 5`
    `Answer = 1`
  * `A = 4`
    `Answer = 0`

=================================

SEND: get 3d7
# Input
  `1 <= A <= 9999999999`

# Output
  `1` if `A` is a palindrome (a number that is the same when reversed), and `0` otherwise.

# Example
  * `A = 1233321`
    `Answer = 1`
  * `A = 3123`
    `Answer = 0`

=================================

SEND: get 3d8
# Input
  `2 <= A <= 10000`

# Output
  The smallest number `X >= 2`, such that `A` written in base `X` is a palindrome.

# Example
  * `A = 1233321`
    `Answer = 10`
  * `A = 3123`
    `Answer = 18`

=================================

SEND: get 3d9
# Input
  A number `A` consisting of digits `1` (representing `(`) and `2` (representing `)`), at most `40` digits long.

# Output
  `1` if the parentheses from the input are properly balanced, and `0` otherwise.

# Example
  * `A = 112212`
    `Answer = 1`
  * `A = 21122`
    `Answer = 0`

=================================

SEND: get 3d10
# Input
  A number `A` consisting of digits `1` (representing `(`), `2` (representing `)`), `3` (representing `[`) and `4` (representing `]`), at most `40` digits long.

# Output
  `1` if the parentheses from the input are properly balanced, and `0` otherwise.

# Example
  * `A = 134212`
    `Answer = 1`
  * `A = 1132`
    `Answer = 0`

=================================

SEND: get 3d11
# Input
  A number `A` consisting of digits `1` (representing `U`), `2` (representing `L`), `3` (representing `D`) and `4` (representing `R`), at most `100` digits long.

# Output
  The number of unique positions that are visited by the Lambdaman path represented by `A`.

# Example
  * `A = 33321411`
    `Answer = 6`

=================================

SEND: get 3d12
# Input
  `-1570796327 <= A <= 1570796327`

# Output
  `truncate(sin(A / 1_000_000_000) * 1_000_000_000)`,

In other words, `sin(A radians)`,
where the input and the output are expressed
in the fixed-point representation with the scaling factor 10^9.

The output may differ from the correct value by 1.

# Tips

* It's probably useful to use the Taylor series representation
  of the sine function.

* Adapting Horner's method to evaluate the series may be useful, too.

# Example
  * `A = 1047197551`
    `Answer = 866025403`
  * `A = -1168378317`
    `Answer = -920116684`


Process finished with exit code 0
