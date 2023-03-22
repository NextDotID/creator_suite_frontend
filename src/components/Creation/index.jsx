import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { useAccount } from "wagmi";
import { polygonMumbai } from "@wagmi/chains";
import { PurchasedNotification } from "../PurchasedNotification";
import { Avatar } from "../Avatar";
import { Previewer } from "../Previewer";
import { Spinner } from "../Spinner";
import { Markdown } from "../Markdown";
import TOKEN_LIST from "../../constants/TokenList.json";
import { useCreation } from "../../hooks/useCreation";
import { useBalanceOf } from "../../hooks/useBalanceOf";
import { usePurchaseCreation } from "../../hooks/usePurchaseCreation";
import { formatBalance } from "../../helpers/formatBalance";
import { isSameAddress } from "../../helpers/isSameAddress";
import { formatKeccakHash } from "../../helpers/formatKeccakHash";
import { resolveTransactionHashLink } from "../../helpers/resolveTransactionHashLink";
import { isGreaterThanOrEqualTo } from "../../helpers/isGreaterThanOrEqualTo";
import { isValidAddress } from "../../helpers/isValidAddress";
import { getQueryVariable } from "../../helpers/queryParams";
import { download } from "../../helpers/download";

export function Creation() {
  const [success, setSuccess] = useState(false);
  const [showPurchasedNotification, setShowPruchasedNotification] =
    useState(false);

  const [openPreviewer, setOpenPreviewer] = useState(false);

  const { creationId } = useParams();
  const creator = getQueryVariable("creator");

  const {
    data: creation,
    isValidating: isValidatingCreation,
    mutate,
  } = useCreation(creationId, creator);
  console.log(creation, "kkkkk");
  // const paymentToken = TOKEN_LIST['Mumbai'].find((x) => isSameAddress(x.address, creation?.paymentTokenAddress))
  const paymentToken = TOKEN_LIST["Mumbai"].find((x) =>
    isSameAddress(
      x.address,
      // todo: payment token
      //   creation?.paymepaymentTokenAddressntToken,
      "0x9801ca34B280b60292692E3fD00599f0Fbb8d6b2"
    )
  );

  const { address } = useAccount();

  const { data: balance, isValidating: isValidatingBalance } = useBalanceOf(
    paymentToken.address,
    address
  );

  const owned = isSameAddress(creator, address);

  const bought = (creation?.buyers ?? []).find((x) =>
    isSameAddress(x.address, address)
  );

  const { trigger, isMutating } = usePurchaseCreation(creationId, address);

  const validationMessage = useMemo(() => {
    if (!isValidAddress(address)) return "";
    if (!isGreaterThanOrEqualTo(balance, 10000000))
      return "Insufficient Balance";
    return "";
  }, [address, balance, creation]);

  if (isValidatingCreation) return <Spinner />;
  if (!creation) return null;
  return (
    <>
      <PurchasedNotification
        success={success}
        show={showPurchasedNotification}
        setShow={setShowPruchasedNotification}
      />
      <Previewer
        title={creation.name || "Empty"}
        attachment={creation.attachments[0] || { name: "", content: "" }}
        open={openPreviewer}
        setOpen={setOpenPreviewer}
      />
      <div className="bg-white">
        <div className="px-4 py-16 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
            {/* Product details */}
            <div className="w-4/5 mx-auto mt-14 sm:mt-16 lg:col-span-7 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
              <div className="flex flex-col-reverse">
                <div className="mt-4">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {creation.name || "Empty"}
                  </h1>

                  <h2 id="information-heading" className="sr-only">
                    Creator information
                  </h2>
                  <p className="inline-flex items-center mt-2 text-sm text-gray-500">
                    {owned ? (
                      <span className="mr-1">You</span>
                    ) : (
                      <Avatar address={creation.ownerAddress} />
                    )}
                    <span className="mr-1">listed at</span>
                    <time className="mr-1" dateTime={creation.createdAt}>
                      {format(creation.createdAt, "dd MMM, yyyy hh:mm a")}
                    </time>
                    <span className="mr-1">with txn</span>
                    <a
                      href={resolveTransactionHashLink(
                        polygonMumbai.id,
                        creation.transactionHash
                      )}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {formatKeccakHash(creation.transactionHash, 4)}
                    </a>
                    <span>.</span>
                  </p>
                </div>

                {bought ? (
                  <div>
                    <p className="text-green-500">
                      You have purchased this creation at{" "}
                      <a
                        href={resolveTransactionHashLink(
                          polygonMumbai.id,
                          bought.transactionHash
                        )}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {formatKeccakHash(bought.transactionHash, 4)}
                      </a>
                      .
                    </p>
                  </div>
                ) : creation.buyers.length > 0 ? (
                  <div>
                    <p className="text-gray-500">{`${creation.buyers.length} people purchased this creation.`}</p>
                  </div>
                ) : null}
              </div>

              <div className="mt-6 text-gray-500">
                <Markdown>{creation.description}</Markdown>
              </div>

              <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-4 sm:grid-cols-1">
                {owned || bought ? (
                  <>
                    <button
                      type="button"
                      className="flex items-center justify-center w-1/2 max-w-sm px-8 py-3 text-base font-medium text-blue-700 border border-transparent rounded-md bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                      onClick={() => setOpenPreviewer(true)}
                    >
                      Preview
                    </button>

                    <button
                      className="flex items-center justify-center w-1/2 max-w-sm px-8 py-3 text-base font-medium text-blue-700 border border-transparent rounded-md bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                      //   href={creation.attachments[0].content}
                      //   download={creation.attachments[0].name}
                      onClick={(e) => {
                        e.preventDefault();
                        // download(
                        //   bytes,
                        //   "application/pdf;charset=UTF-8",
                        //   `result.${creation.extension}`
                        // );
                        console.log('download')
                      }}
                    >
                      Download
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="flex items-center justify-center w-1/2 max-w-sm px-8 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                      disabled={
                        isMutating ||
                        isValidatingBalance ||
                        isValidatingCreation ||
                        validationMessage
                      }
                      onClick={async () => {
                        try {
                          await trigger();
                          await mutate();
                          setSuccess(true);
                        } catch {
                          setSuccess(false);

                          // reset
                          setShowPruchasedNotification(false);
                        } finally {
                          setShowPruchasedNotification(true);
                        }
                      }}
                    >
                      {isValidatingCreation || isValidatingBalance
                        ? "Loading..."
                        : validationMessage
                        ? validationMessage
                        : isMutating
                        ? "Paying..."
                        : `Pay ${formatBalance(
                            creation.paymentTokenAmount,
                            paymentToken.decimals,
                            2
                          )} ${paymentToken.symbol} for full-access`}
                    </button>
                    {paymentToken ? (
                      isValidatingBalance ? (
                        <p className="mt-2 text-sm text-gray-500">
                          Loading balance...
                        </p>
                      ) : isValidAddress(address) ? (
                        <p className="mt-2 text-sm text-gray-500">
                          Balance:{" "}
                          {formatBalance(balance, paymentToken.decimals, 2)}{" "}
                          {paymentToken.symbol}
                        </p>
                      ) : (
                        <p className="mt-2 text-sm text-gray-500">
                          Please connect a wallet to purchase this creation.
                        </p>
                      )
                    ) : null}
                  </>
                )}
              </div>

              <div className="pt-10 mt-10 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900">Share</h3>
                <ul role="list" className="flex items-center mt-4 space-x-6">
                  <li>
                    <Link
                      to="/creation"
                      className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Share on Facebook</span>
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/creation"
                      className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Share on Instagram</span>
                      <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/creation"
                      className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Share on Twitter</span>
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
