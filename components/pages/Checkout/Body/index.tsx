"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  ShoppingBag,
  Banknote,
  CreditCard,
  Wallet,
  LockKeyhole,
  ChevronRight,
} from "lucide-react";
import type { RootState } from "@/redux/app/store";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { placeOrder } from "@/redux/features/orders/ordersSlice";
import { pushToast } from "@/redux/features/ui/uiSlice";
import {
  checkoutSchema,
  cardSchema,
  type CheckoutFormValues,
} from "@/lib/schemas";
import { Link, useRouter } from "@/i18n/navigation";

type PaymentMethod = "cod" | "card" | "paypal";

const PAYMENTS: { id: PaymentMethod; icon: typeof Banknote; labelKey: string }[] = [
  { id: "cod", icon: Banknote, labelKey: "cod" },
  { id: "card", icon: CreditCard, labelKey: "card" },
  { id: "paypal", icon: Wallet, labelKey: "paypal" },
];

export default function CheckoutBody() {
  const t = useTranslations("Store.checkout");
  const tc = useTranslations("Store.cart");
  const tp = useTranslations("Store.toasts");
  const dispatch = useDispatch();
  const router = useRouter();
  const items = useSelector((s: RootState) => s.cart.items);
  const user = useSelector((s: RootState) => s.auth.user);

  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardErrors, setCardErrors] = useState<{
    cardNumber?: string;
    expiry?: string;
    cvc?: string;
  }>({});

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: "",
      address: "",
      city: "",
      zip: "",
    },
  });

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-neutral-l-grey/40 py-24 text-center"
      >
        <ShoppingBag className="size-14 text-neutral-l-grey" />
        <h2 className="text-xl font-bold text-neutral-black dark:text-neutral-white">
          {tc("empty")}
        </h2>
        <Link
          href="/products/mobiles"
          className="rounded-full bg-brand-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-shade-s2"
        >
          {tc("emptyCta")}
        </Link>
      </motion.div>
    );
  }

  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);

  const inputClass = (hasError: boolean) =>
    `h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30 ${
      hasError ? "border-red-500" : "border-input"
    }`;

  const onSubmit = handleSubmit(async () => {
    if (payment === "card") {
      const parsed = cardSchema.safeParse({ cardNumber, expiry, cvc });
      if (!parsed.success) {
        const fieldErrors = parsed.error.flatten().fieldErrors;
        setCardErrors({
          cardNumber: fieldErrors.cardNumber?.[0],
          expiry: fieldErrors.expiry?.[0],
          cvc: fieldErrors.cvc?.[0],
        });
        return;
      }
    }
    await new Promise((r) => setTimeout(r, 900));
    dispatch(
      placeOrder({
        items,
        subtotal,
        shipping: 0,
        total: subtotal,
        paymentMethod: payment,
      })
    );
    dispatch(clearCart());
    dispatch(pushToast({ message: tp("orderPlaced") }));
    router.push("/orders");
  });

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_380px]">
      <section className="space-y-8">
        <h1 className="text-28 font-bold text-neutral-black sm:text-36 dark:text-neutral-white">
          {t("title")}
        </h1>

        <form onSubmit={onSubmit} noValidate className="space-y-3">
          <input {...register("name")} placeholder={t("name")} className={inputClass(!!errors.name)} />
          {errors.name && <p className="-mt-2 text-xs text-red-500">{errors.name.message}</p>}
          <input {...register("email")} type="email" placeholder={t("email")} className={inputClass(!!errors.email)} />
          {errors.email && <p className="-mt-2 text-xs text-red-500">{errors.email.message}</p>}
          <input {...register("phone")} placeholder={t("phone")} className={inputClass(!!errors.phone)} />
          {errors.phone && <p className="-mt-2 text-xs text-red-500">{errors.phone.message}</p>}
          <input {...register("address")} placeholder={t("address")} className={inputClass(!!errors.address)} />
          {errors.address && <p className="-mt-2 text-xs text-red-500">{errors.address.message}</p>}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input {...register("city")} placeholder={t("city")} className={inputClass(!!errors.city)} />
              {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>}
            </div>
            <div>
              <input {...register("zip")} placeholder={t("zip")} className={inputClass(!!errors.zip)} />
              {errors.zip && <p className="mt-1 text-xs text-red-500">{errors.zip.message}</p>}
            </div>
          </div>

          <fieldset className="space-y-2 pt-4">
            <legend className="pb-2 font-bold">{t("payment")}</legend>
            {PAYMENTS.map(({ id, icon: Icon, labelKey }) => (
              <label
                key={id}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-colors ${
                  payment === id
                    ? "border-brand-primary bg-tint-t5 dark:bg-shade-s5/40"
                    : "border-input hover:border-neutral-l-grey"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={id}
                  checked={payment === id}
                  onChange={() => setPayment(id)}
                  className="sr-only"
                />
                <Icon
                  className={`size-5 ${payment === id ? "text-brand-primary" : "text-neutral-grey"}`}
                />
                <span className="flex-1 text-sm font-semibold text-neutral-black dark:text-neutral-white">
                  {t(labelKey)}
                </span>
                <span
                  className={`size-4 rounded-full border-2 ${
                    payment === id
                      ? "border-brand-primary bg-brand-primary ring-2 ring-inset ring-white dark:ring-shade-s5"
                      : "border-neutral-l-grey"
                  }`}
                />
              </label>
            ))}
          </fieldset>

          <AnimatePresence initial={false}>
            {payment === "card" && (
              <motion.div
                key="card-fields"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="grid gap-3 rounded-2xl border border-input p-4">
                  <div>
                    <input
                      value={cardNumber}
                      onChange={(e) => {
                        setCardNumber(e.target.value);
                        if (cardErrors.cardNumber) {
                          setCardErrors((prev) => ({ ...prev, cardNumber: undefined }));
                        }
                      }}
                      inputMode="numeric"
                      placeholder={t("cardNumber")}
                      aria-label={t("cardNumber")}
                      maxLength={23}
                      className={inputClass(!!cardErrors.cardNumber)}
                    />
                    {cardErrors.cardNumber && (
                      <p className="mt-1 text-xs text-red-500">{cardErrors.cardNumber}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        value={expiry}
                        onChange={(e) => {
                          setExpiry(e.target.value);
                          if (cardErrors.expiry) {
                            setCardErrors((prev) => ({ ...prev, expiry: undefined }));
                          }
                        }}
                        placeholder={t("expiry")}
                        aria-label={t("expiry")}
                        maxLength={5}
                        className={inputClass(!!cardErrors.expiry)}
                      />
                      {cardErrors.expiry && (
                        <p className="mt-1 text-xs text-red-500">{cardErrors.expiry}</p>
                      )}
                    </div>
                    <div>
                      <input
                        value={cvc}
                        onChange={(e) => {
                          setCvc(e.target.value);
                          if (cardErrors.cvc) {
                            setCardErrors((prev) => ({ ...prev, cvc: undefined }));
                          }
                        }}
                        inputMode="numeric"
                        placeholder={t("cvc")}
                        aria-label={t("cvc")}
                        maxLength={4}
                        className={inputClass(!!cardErrors.cvc)}
                      />
                      {cardErrors.cvc && (
                        <p className="mt-1 text-xs text-red-500">{cardErrors.cvc}</p>
                      )}
                    </div>
                  </div>
                  <p className="flex items-center gap-1.5 text-xs text-neutral-grey">
                    <LockKeyhole className="size-3.5 text-brand-primary" />
                    {t("secureNote")}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-brand-primary py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-colors hover:bg-shade-s2 disabled:opacity-60"
          >
            {isSubmitting ? t("processing") : t("placeOrder")}
          </motion.button>
        </form>
      </section>

      <aside className="h-fit space-y-5 rounded-3xl border border-neutral-l-grey/20 bg-neutral-silver p-6 lg:sticky lg:top-24 dark:bg-white/5">
        <h3 className="font-bold">{t("summary")}</h3>
        <ul className="max-h-64 space-y-3 overflow-y-auto pe-1">
          {items.map(({ product, quantity }) => (
            <li key={product.id} className="flex items-center gap-3">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-background dark:bg-white/10">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  unoptimized
                  sizes="56px"
                  className="object-contain p-1"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{product.name}</p>
                <p className="text-xs text-neutral-grey">×{quantity}</p>
              </div>
              <span className="text-sm font-semibold text-shade-s2 dark:text-brand-primary">
                ₹{(product.price * quantity).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>

        <dl className="space-y-2 border-t border-neutral-l-grey/20 pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-neutral-grey">{tc("subtotal")}</dt>
            <dd className="font-semibold">₹{subtotal.toLocaleString()}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-grey">{tc("shipping")}</dt>
            <dd className="font-semibold text-brand-primary">{tc("free")}</dd>
          </div>
          <div className="flex justify-between pt-1 text-base">
            <dt className="font-bold">{tc("total")}</dt>
            <dd className="font-bold text-brand-primary">₹{subtotal.toLocaleString()}</dd>
          </div>
        </dl>

        <Link
          href="/cart"
          className="flex items-center justify-center gap-1 text-sm font-medium text-brand-primary transition-colors hover:text-shade-s2"
        >
          <ChevronRight className="size-4 rtl:-scale-x-100" />
          {t("backToCart")}
        </Link>
      </aside>
    </div>
  );
}
