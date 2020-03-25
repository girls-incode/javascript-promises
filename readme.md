
# Program example on how to use Javascript Async operations with Promise.all

Make a list of N top brand names for a specific user based
on his/her preferences followgin these rules:

1. Every user has a list of brands he/she likes most. If there are at
least N liked brands, take the first N brand names from the list.

2. There are lists of brands which are most popular among the users of
each gender. If the user's list does not have enough liked brands, then
the rest of the result list should be filled up with top brands from list
for the user's gender.

3. If the user's individual preference list and the list for that user's
gender combined do not provide enough brands, you should finish with an
error.

## Main function:

function solution(U, N);

Given user U and the number of brand names N, returns a Promise that should either be: 
resolved with an array of exactly N top brand names for the given user,
in this format: ["Some Brand Name", "Other Brand Name", ...]; 
or
rejected with a CustomError with the message "Not enough data" (if there are fewer than N brand names to be listed, or both Promises (called in parallel): getLikedBrands and getTopBrandsForGender are rejected).

## Data format
The user parameter is an object of the following structure: { id: 123132, gender: "FEMALE" },
where id is an integer and gender is a string containing either "FEMALE" or "MALE".

The brand names liked by a specific user can be accessed by calling the function getLikedBrands(id).
The list of brands for a gender can be obtained by calling the function getTopBrandsForGender(gender).

The functions return Promises, that will be rejected or resolved with data in the following format:
[ { id: 123, name: "Some Brand Name" }, { id: 456, name: "Other Brand Name"}, ... ]

## The result
The order of the brand names in the result list should be the same as the order in the lists 
produced by the functions, with brand names returned by getLikedBrands(id) listed first.
Brand names returned by both functions getLikedBrands(id) and getTopBrandsForGender(gender) in
combination, should appear in the result list only once.

## Examples
Given user U, assume that getLikedBrands(U.id) returns:
[{id: 1, name: "Adidas"}, {id: 5, name: "Armani"}]
and 
getTopBrandsForGender(U.gender) returns: 
[{id: 3, name: "Kalvin klein"}, {id: 2, name: "Desigual"}, {id: 4, name: "Izarpure"}]

1. For N=1
The function solution(U, N) should return a promise which resolves with an array ["Adidas"]

2. For N=3
Promise should be resolved with an array ["Adidas", "Armani", "Kalvin klein"]

3. For N=4
Promise should be resolved with an array ["Adidas", "Armani", "Kalvin klein", "Desigual"]

4. For N=5 
Promise should be rejected with a CustomError.