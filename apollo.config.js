module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "Higawari-eats-back-end",
      url: "http://localhost:4000/graphql",
    },
  },
};
