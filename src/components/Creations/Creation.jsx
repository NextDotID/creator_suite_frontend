import { formatDistanceToNowStrict } from "date-fns";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import TOKEN_LIST from "../../constants/TokenList.json";
import { formatBalance } from "../../helpers/formatBalance";
import { getFileType } from "../../helpers/getFileType";
import { isSameAddress } from "../../helpers/isSameAddress";

export function Creation(props) {
  const paymentToken = TOKEN_LIST["Mumbai"].find((x) =>
    // todo: dead code telsa here
    isSameAddress(x.address, "0x9801ca34B280b60292692E3fD00599f0Fbb8d6b2")
  );
  
  return (
    <Link to={`/${props.id}?creator=${props.files[0].creator_address}`}>
      <div key={props.id} className="relative group">
        <div className="w-full overflow-hidden bg-gray-200 rounded-md min-h-40 aspect-w-1 aspect-h-1 group-hover:opacity-75 lg:aspect-none lg:h-40">
          <span className="inline-flex items-center justify-center object-cover object-center w-full h-full text-6xl lg:h-full lg:w-full">
            {getFileType({
              name: props.files[0].name,
              content: props.files[0].name,
            }).toUpperCase()}
          </span>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-bold text-gray-700">
            <span aria-hidden="true" className="absolute inset-0" />
            {props.files[0].name}
          </h3>

          <div className="flex items-center justify-between">
            <p className="mt-1 text-sm text-gray-500">
              {formatDistanceToNowStrict(new Date(props.update_time), {
                addSuffix: true,
              })}
            </p>
            {paymentToken ? (
              <p className="text-sm text-gray-900">
                <span className="mr-1 text-gray-500">Price:</span>
                <span className="font-medium">
                  {/* {formatBalance(props.paymentTokenAmount, paymentToken.decimals, 2)}{' '}
                                    {paymentToken.symbol} */}
                  {formatBalance(100000000000000, paymentToken.decimals, 2)}{" "}
                  {"Telsa"}
                </span>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}
