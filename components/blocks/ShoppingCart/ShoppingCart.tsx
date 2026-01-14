"use client";

import { Popover } from "@/components/retroui/Popover";
import { Button } from "@/components/retroui/Button";
import { Text } from "@/components/retroui/Text";
import { Avatar } from "@/components/retroui/Avatar";
import { Card } from "@/components/retroui/Card";
import { Badge } from "@/components/retroui/Badge";
import { ShoppingCart as ShoppingCartIcon, X, Calendar, Clock, ArrowRight } from "lucide-react";
import { useCartProvider } from "@/providers/cart/CartProvider";
import { CartItem } from "@/types/cart";
import { cn } from "@/lib/utils";
import Link from "next/link";

function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatTime(time: string): string {
  return time.slice(0, 5); // Format HH:mm
}

export function ShoppingCart() {
  const { cart, removeFromCart, clearCart } = useCartProvider();
  const cartCount = cart.length;
  const totalValue = cart.reduce((sum, item) => sum + item.value, 0);

  return (
    <Popover>
      <Popover.Trigger className="relative">
        <ShoppingCartIcon className="h-5 w-5" />
        {cartCount > 0 && (
          <span className="font-medium text-[10px] text-white bg-black rounded-full h-[12px] w-[12px] flex items-center justify-center absolute -top-1 -right-1">
            {cartCount}
          </span>
        )}
      </Popover.Trigger>
      <Popover.Content
        className="min-w-[320px] max-w-[calc(100vw-32px)] max-h-[600px] overflow-y-auto border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white p-0"
        side="left"
        align="end"
        sideOffset={8}
        alignOffset={0}
        collisionPadding={16}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-black">
            <Text as="h3" variant="h5">
              Carrinho
            </Text>
            {cartCount > 0 && (
              <Button
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  clearCart();
                }}
              >
                Limpar
              </Button>
            )}
          </div>

          {cartCount === 0 ? (
            <div className="py-8 text-center">
              <div className="mb-4">

                <Text variant="h6" className="mb-2">
                  Seu carrinho está vazio
                </Text>
                <Text variant="bodySm" className="text-muted-foreground mb-6">
                  Adicione aulas de direção ao seu carrinho para começar
                </Text>
              </div>
              <Button asChild className="w-full" size="md">
                <Link href="/vitrine">
                  Explorar instrutores
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item: CartItem) => (
                <Card
                  key={item.identifier}
                  className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white rounded-none"
                >
                  <Card.Content className="p-3">
                    <div className="flex items-start gap-3">
                      <Avatar
                        src={item.instructor.avatar}
                        name={item.instructor.name}
                        size="sm"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div className="flex-1 min-w-0">
                            <Text variant="bodySm" className="font-semibold">
                              {item.instructor.name}
                            </Text>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.preventDefault();
                              removeFromCart(item);
                            }}
                            className="shrink-0 h-6 w-6 p-0 hover:bg-primary flex items-center justify-center"
                            aria-label="Remover item"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-2 mb-3">
                          {item.schedule.map((schedule, idx) => (
                            <div
                              key={idx}
                              className="border-2 border-black bg-white p-2 flex items-center gap-2 text-xs shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                            >
                              <div className="flex items-center gap-1.5 shrink-0">
                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                <Text variant="caption" className="font-semibold">
                                  {formatDate(schedule.date)}
                                </Text>
                              </div>
                              <div className="h-3 w-px bg-black" />
                              <div className="flex items-center gap-1.5 flex-1 min-w-0">
                                <Clock className="h-3 w-3 text-muted-foreground shrink-0" />
                                <Text variant="caption" className="text-muted-foreground">
                                  {formatTime(schedule.startTime)} -{" "}
                                  {formatTime(schedule.endTime)}
                                </Text>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t-2 border-black">
                          <Text variant="caption" className="text-muted-foreground">
                            Total:
                          </Text>
                          <Badge variant="surface" size="sm" className="font-bold">
                            R$ {item.value.toFixed(2).replace(".", ",")}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              ))}

              <div className="pt-4 border-t-2 border-black">
                <div className="flex items-center justify-between mb-4">
                  <Text variant="h6">Total do carrinho:</Text>
                  <Text variant="h5" className="font-black">
                    R$ {totalValue.toFixed(2).replace(".", ",")}
                  </Text>
                </div>
                <Button className="w-full" size="md">
                  Finalizar compra
                </Button>
              </div>
            </div>
          )}
        </div>
      </Popover.Content>
    </Popover>
  );
}
