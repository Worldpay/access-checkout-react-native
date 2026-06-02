import XCTest

func asyncAssert(_ assertion: @escaping () -> Void) -> XCTestExpectation {
    let expectation = XCTestExpectation(description: "")
    
    let maxAttempts = 5
    var attempts = 1

    func recursiveAssert() {
        let assertQueue = DispatchQueue(label: "assert-queue")

        // increases gap between attempts
        assertQueue.asyncAfter(deadline: .now() + 0.1 * Double(attempts + 1)) {
            do {
                assertion()
                expectation.fulfill()
            } catch {
                attempts += 1
                if attempts < maxAttempts {
                    NSLog("Retrying assertion (attempt \(attempts)/\(maxAttempts))")
                    recursiveAssert()
                }
            }
        }
    }
    
    recursiveAssert()

    return expectation
}
