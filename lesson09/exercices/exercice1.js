verify(/\sc/,
       ["my car", "bad cats"], // Should match
       ["camper", "high art"]); // Should not match

verify(/r/,
       ["pop culture", "mad props"],
       ["plop"]);

verify(/ferr[eya]/,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);

verify(/ious(\s|$)/,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);

verify(/\.$/,
       ["bad punctuation ."],
       ["escape the dot"]);

verify(/\w{7,20}/,
       ["hottentottententen"],
       ["no", "hotten totten tenten"]);

verify(/^[rw]/,
       ["red platypus", "wobbling nest"],
       ["earth bed", "learning ape"]);


function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  yes.forEach(function(s) {
    if (!regexp.test(s))
      console.log("Failure to match '" + s + "'");
  });
  no.forEach(function(s) {
    if (regexp.test(s))
      console.log("Unexpected match for '" + s + "'");
  });
}