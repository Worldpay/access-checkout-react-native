// swift-tools-version:5.7
//
// Vendored local SPM package: Mockingjay (HTTP stubbing) + its URITemplate
// dependency.
//
// Why vendored: the SDK's native unit tests use Mockingjay, which was supplied
// by CocoaPods before the SwiftPM migration. Mockingjay (kylef/Mockingjay) ships
// no Package.swift, and neither do any maintained forks — so it cannot be
// consumed as a remote SPM package. The sources are copied in here (both are
// BSD-licensed; see MOCKINGJAY-LICENSE / URITEMPLATE-LICENSE) so the unit tests
// build from a clean clone with no CocoaPods and no network dependency for the
// mocking library.
//
// URITemplate (kylef/URITemplate.swift) is vendored as a second target rather
// than pulled over SPM because its only purpose here is Mockingjay's `uri()`
// matcher, and its own package deps (PathKit/Spectre) are test-only — vendoring
// the single source file keeps the graph self-contained.

import PackageDescription

let package = Package(
    name: "Mockingjay",
    platforms: [.iOS(.v13)],
    products: [
        .library(name: "Mockingjay", targets: ["Mockingjay"]),
    ],
    targets: [
        .target(
            name: "URITemplate",
            path: "Sources/URITemplate"
        ),
        .target(
            name: "Mockingjay",
            dependencies: ["URITemplate"],
            path: "Sources/Mockingjay"
        ),
    ]
)
