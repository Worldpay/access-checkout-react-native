import AccessCheckoutSDK

struct Session {
    let card: String?
    let cvc: String?

    init(card: String?, cvc: String?) {
        self.card = card
        self.cvc = cvc
    }
}
