import sys

sys.path.insert(0, ".")
from pyteal import *

TIMEOUT = 185
ACC1_ADDR = "LHRYGXNIMZKE24FXS3A5DCTPHCA63H6HYIGITBKEQJB4JPZ3FIQ6SYUNS4"
ACC2_ADDR = "U2C455RC4GUXJCLBLMKPQ4WOYDG3HQNUYDXKTQQQGIC67REIA7CRBRNID4"
HASH = "4LwK+i4AB9b+C/VppWFpiahv11+mUlgnCElb12N/y5Y="


def htlc():
    basic_checks = And(
        Txn.type_enum() == TxnType.Payment,
        Txn.rekey_to() == Global.zero_address(),
        Txn.close_remainder_to() == Global.zero_address(),
    )

    withdraw = And(basic_checks, Sha256(Arg(0)) == Bytes("base64", HASH))

    recover_fund = And(basic_checks, Txn.first_valid() > Int(TIMEOUT))

    program = Cond(
        [Txn.receiver() == Addr(ACC2_ADDR), withdraw],
        [Txn.receiver() == Addr(ACC1_ADDR), recover_fund],
    )

    return program


if __name__ == "__main__":
    htlc_program = compileTeal(htlc(), mode=Mode.Signature, version=8)
    with open("./artifacts/htlc.teal", "w") as f:
        f.write(htlc_program)
