module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "./tp/pallet-event",
  testEnvironment: "node",
  testRegex: ".e2e-spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  setupFiles: ['dotenv/config']
}
