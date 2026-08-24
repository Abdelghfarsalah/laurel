"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, CheckCircle2 } from "lucide-react";
import type { RootState } from "@/redux/app/store";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/redux/features/cart/cartSlice";
import { checkoutSchema, type CheckoutFormValues } from "@/lib/schemas";
import { Link } from "@/i18n/navigation";

export default function CartBody() {
  const t = useTranslations("Store.cart");
  const tc = useTranslations("Store.checkout");
  const tp = useTranslations("Store.products");
  const dispatch = useDispatch();
  const items = useSelector((s: RootState) => s.cart.items);
  const [placed, setPlaced] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { name: "", email: "", phone: "", address: "", city: "", zip: "" },
  });

  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 900));
    dispatch(clearCart());
    setPlaced(true);
    reset();
  };

  if (placed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-3xl border border-brand-primary/30 bg-tint-t5 p-14 text-center dark:bg-shade-s5/30"
      >
        <CheckCircle2 className="size-16 text-brand-primary" />
        <h2 className="text-xl font-bold">{tc("success")}</h2>
        <Link
          href="/"
          className="rounded-full bg-brand-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-shade-s2"
        >
          {t("emptyCta")}
        </Link>
      </motion.div>
    );
  }

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-neutral-l-grey/40 py-24 text-center"
      >
        <ShoppingBag className="size-14 text-neutral-l-grey" />
        <h2 className="text-xl font-bold text-neutral-black dark:text-neutral-white">
          {t("empty")}
        </h2>
        <Link
          href="/products/mobiles"
          className="rounded-full bg-brand-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-shade-s2"
        >
          {t("emptyCta")}
        </Link>
      </motion.div>
    );
  }

  const inputClass = (hasError: boolean) =>
    `h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/30 ${
      hasError ? "border-red-500" : "border-input"
    }`;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-28 font-bold text-neutral-black sm:text-36 dark:text-neutral-white">
            {t("title")}
          </h1>
          <span className="text-sm text-neutral-grey">
            {items.length} {t("items")}
          </span>
        </div>
        <div className="mb-4 flex items-center justify-end">
          <button
            onClick={() => dispatch(clearCart())}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-600"
          >
            <Trash2 className="size-4" />
            {t("clear")}
          </button>
        </div>

        <ul className="space-y-3">
          <AnimatePresence initial={false}>
            {items.map(({ product, quantity }) => (
              <motion.li
                key={product.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="flex gap-4 rounded-2xl border border-neutral-l-grey/20 p-3 sm:p-4"
              >
                <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-neutral-silver sm:size-24 dark:bg-white/5">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    unoptimized
                    sizes="96px"
                    className="object-contain p-1"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 py-0.5">
                  <p className="line-clamp-2 text-sm font-medium">{product.name}</p>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-shade-s2 dark:text-brand-primary">
                      {product.priceLabel || `₹${product.price}`}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center rounded-full border border-input">
                        <button
                          aria-label="decrease"
                          onClick={() =>
                            dispatch(
                              updateQuantity({ id: product.id, quantity: quantity - 1 })
                            )
                          }
                          disabled={quantity <= 1}
                          className="grid size-8 place-items-center rounded-full disabled:opacity-40"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">
                          {quantity}
                        </span>
                        <button
                          aria-label="increase"
                          onClick={() =>
                            dispatch(
                              updateQuantity({ id: product.id, quantity: quantity + 1 })
                            )
                          }
                          className="grid size-8 place-items-center rounded-full"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <button
                        aria-label="remove"
                        onClick={() => dispatch(removeFromCart(product.id))}
                        className="grid size-8 place-items-center rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </section>

      <aside className="h-fit space-y-5 rounded-3xl border border-neutral-l-grey/20 bg-neutral-silver p-6 lg:sticky lg:top-24 dark:bg-white/5">
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-neutral-grey">{t("subtotal")}</dt>
            <dd className="font-semibold">₹{subtotal.toLocaleString()}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-grey">{t("shipping")}</dt>
            <dd className="font-semibold text-brand-primary">{t("free")}</dd>
          </div>
          <div className="flex justify-between border-t border-neutral-l-grey/20 pt-3 text-base">
            <dt className="font-bold">{t("total")}</dt>
            <dd className="font-bold text-brand-primary">₹{subtotal.toLocaleString()}</dd>
          </div>
        </dl>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3 pt-2">
          <h3 className="font-bold">{tc("title")}</h3>
          <div>
            <input {...register("name")} placeholder={tc("name")} className={inputClass(!!errors.name)} />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <input {...register("email")} type="email" placeholder={tc("email")} className={inputClass(!!errors.email)} />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <input {...register("phone")} placeholder={tc("phone")} className={inputClass(!!errors.phone)} />
            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
          </div>
          <div>
            <input {...register("address")} placeholder={tc("address")} className={inputClass(!!errors.address)} />
            {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input {...register("city")} placeholder={tc("city")} className={inputClass(!!errors.city)} />
              {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>}
            </div>
            <div>
              <input {...register("zip")} placeholder={tc("zip")} className={inputClass(!!errors.zip)} />
              {errors.zip && <p className="mt-1 text-xs text-red-500">{errors.zip.message}</p>}
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-brand-primary py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-colors hover:bg-shade-s2 disabled:opacity-60"
          >
            {isSubmitting ? tp("added") : tc("placeOrder")}
          </motion.button>
        </form>
      </aside>
    </div>
  );
}
