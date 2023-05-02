from pyteal import *

TIMEOUT = 1
ACC1_ADDR = ""
ACC2_ADDR = ""
HASH = ""


def htlc():
    # write your code here
    return Int(1)


if __name__ == "__main__":
    htlc_program = compileTeal(htlc(), mode=Mode.Signature, version=8)
    with open("./artifacts/htlc.teal", "w") as f:
        f.write(htlc_program)
