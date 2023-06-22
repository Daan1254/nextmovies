import { databaseUrl } from "@/pages/_app";
import { GetServerSideProps } from "next/types";
import { Order, OrderStatus } from "@/types/order";
import Image from "next/dist/client/image";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const orderResponse = await fetch(
    `${databaseUrl}/order/${context.params?.uuid}`
  );

  const order: Order = await orderResponse.json();
  return {
    props: {
      order,
    },
  };
};

export default function Page({ order }: { order: Order }) {
  function calculateTotalPrice() {
    return ((order.timestamp.price * order.seats.length) / 100).toFixed(2);
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function checkOrderStatus() {
    switch (order.status) {
      case OrderStatus.PENDING:
        return "w-1/2";
        break;
      case OrderStatus.COMPLETED && order?.tickets[0]?.url:
        return "w-full";
        break;
      default:
        return "w-0";
    }
  }

  function downloadTickets() {
    order.tickets.forEach((ticket) => {
      if (ticket.url) {
        window.open(ticket.url, "_blank");
      }
    });
  }

  return (
    <>
      {order?.uuid ? (
        <div className="container mx-auto">
          <div className="flex flex-col gap-32 items-center w-full">
            <h1 className="text-4xl font-bold">Order Summary</h1>
            <div className="space-y-24">
              <div className="grid grid-cols-1 text-sm sm:grid-rows-1 sm:grid-cols-12 sm:gap-x-6 md:gap-x-8 lg:gap-x-8">
                <div className="sm:col-span-4 md:col-span-5 md:row-end-2 md:row-span-2">
                  <div className="aspect-w-1 aspect-h-1 bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      width={1000}
                      height={1000}
                      src={order.timestamp.movie.thumbnail}
                      alt="Off-white t-shirt with circular dot illustration on the front of mountain ridges that fade."
                      className="object-center object-cover"
                    />
                  </div>
                </div>
                <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                  <h3 className="text-lg font-medium text-white">
                    {order.timestamp.movie.title}
                  </h3>
                  <p className="font-medium text-white mt-1">
                    &euro; {calculateTotalPrice()}
                  </p>
                  <p className="text-white mt-3">
                    {order.timestamp.movie.description}
                  </p>
                </div>
                <div className="sm:col-span-12 md:col-span-7">
                  <dl className="grid grid-cols-1 gap-y-8 border-b py-8 border-gray-200 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                    <div>
                      <dt className="font-medium text-white">
                        User information
                      </dt>
                      <dd className="mt-3 text-gray-300">
                        <span className="block">{order.user?.email}</span>
                      </dd>
                    </div>
                    {order.status === OrderStatus.COMPLETED && (
                      <div>
                        <dt className="font-medium text-white">Tickets</dt>
                        <dd className="mt-3 text-gray-300 space-y-3">
                          {order?.tickets[0]?.url ? (
                            <button
                              type="button"
                              className="font-medium text-white rounded  bg-blue-600 px-9 py-1"
                              onClick={downloadTickets}
                            >
                              Download
                            </button>
                          ) : (
                            <p>Tickets are being processed...</p>
                          )}
                        </dd>
                      </div>
                    )}
                  </dl>
                  <p className="font-medium text-white mt-6 md:mt-10">
                    Tickets purchased on {formatDate(order.timestamp.startDate)}
                  </p>
                  <div className="mt-6">
                    <div className="bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-2 ${
                          order.status !== OrderStatus.FAILED
                            ? "bg-blue-600"
                            : "bg-red-600"
                        } rounded-full ${checkOrderStatus()}  `}
                      ></div>
                    </div>
                    {order.status !== OrderStatus.FAILED ? (
                      <div className="hidden sm:grid grid-cols-3 font-medium text-white mt-6">
                        <div className={`text-white`}>Order placed</div>
                        <div
                          className={`text-center ${
                            order.status === OrderStatus.PENDING &&
                            "text-gray-300"
                          }`}
                        >
                          Processing
                        </div>
                        <div
                          className={`text-right ${
                            order.status !== OrderStatus.COMPLETED &&
                            "text-gray-300"
                          }`}
                        >
                          Completed
                        </div>
                      </div>
                    ) : (
                      <h1 className="text-2xl text-center mt-5">
                        Payment failed
                      </h1>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1 className="h-full w-full flex justify-center text-3xl items-center">
            Order not Found
          </h1>
        </>
      )}
    </>
  );
}
