"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, ArrowRight, MapPin, Phone, Calendar, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { leadApi } from "@/lib/api";

const schema = z.object({
  movingFrom: z.string().min(2, "Please enter origin city"),
  movingTo:   z.string().min(2, "Please enter destination city"),
  phone:      z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number"),
  movingDate: z.string().min(1, "Please select a date"),
  movingType: z.string().min(1, "Please select move type"),
  service:    z.string().min(1, "Please select a service"),
});

type FormData = z.infer<typeof schema>;

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError,  setApiError]  = useState("");

  const { register, handleSubmit, setValue, reset, formState: { errors } } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true); setApiError("");
    try {
      await leadApi.create({
        name:        "Quote Request",        // name is captured post-call
        mobile:      data.phone,
        moveFrom:    data.movingFrom,
        moveTo:      data.movingTo,
        moveDate:    data.movingDate,
        serviceType: data.service,
        message:     `Move type: ${data.movingType}`,
      });
      setSubmitted(true);
      reset();
    } catch {
      setApiError("Failed to submit. Please try again or call us directly.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass rounded-3xl p-6 lg:p-8 shadow-glass">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="w-10 h-10 text-green-400" />
            </motion.div>
            <h3 className="text-white text-2xl font-bold mb-2">Quote Requested!</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Our team will call you back within{" "}
              <span className="text-green-400 font-semibold">30 minutes</span>.
            </p>
            <Button
              variant="ghost-white"
              size="sm"
              onClick={() => setSubmitted(false)}
            >
              Submit Another
            </Button>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="mb-6">
              <h2 className="text-white text-xl font-bold mb-1">Get Free Moving Quote</h2>
              <p className="text-gray-400 text-sm">Instant estimate • No obligation</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* From / To */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="movingFrom">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-brand-red" /> Moving From
                    </span>
                  </Label>
                  <Input
                    id="movingFrom"
                    placeholder="e.g. Kolkata"
                    {...register("movingFrom")}
                    className={errors.movingFrom ? "border-red-400 focus-visible:ring-red-400" : ""}
                  />
                  {errors.movingFrom && (
                    <p className="text-red-400 text-xs">{errors.movingFrom.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="movingTo">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-green-400" /> Moving To
                    </span>
                  </Label>
                  <Input
                    id="movingTo"
                    placeholder="e.g. Mumbai"
                    {...register("movingTo")}
                    className={errors.movingTo ? "border-red-400 focus-visible:ring-red-400" : ""}
                  />
                  {errors.movingTo && (
                    <p className="text-red-400 text-xs">{errors.movingTo.message}</p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <Label htmlFor="phone">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-brand-red" /> Mobile Number
                  </span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  {...register("phone")}
                  className={errors.phone ? "border-red-400 focus-visible:ring-red-400" : ""}
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs">{errors.phone.message}</p>
                )}
              </div>

              {/* Date */}
              <div className="space-y-1.5">
                <Label htmlFor="movingDate">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-brand-red" /> Planned Move Date
                  </span>
                </Label>
                <Input
                  id="movingDate"
                  type="date"
                  {...register("movingDate")}
                  className={`${errors.movingDate ? "border-red-400 focus-visible:ring-red-400" : ""} [color-scheme:dark]`}
                  min={new Date().toISOString().split("T")[0]}
                />
                {errors.movingDate && (
                  <p className="text-red-400 text-xs">{errors.movingDate.message}</p>
                )}
              </div>

              {/* Moving Type */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>
                    <span className="flex items-center gap-1">
                      <Truck className="w-3 h-3 text-brand-red" /> Move Type
                    </span>
                  </Label>
                  <Select onValueChange={(val) => setValue("movingType", val)}>
                    <SelectTrigger className={errors.movingType ? "border-red-400" : ""}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local (Within City)</SelectItem>
                      <SelectItem value="domestic">Domestic (Inter-City)</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.movingType && (
                    <p className="text-red-400 text-xs">{errors.movingType.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label>Service Needed</Label>
                  <Select onValueChange={(val) => setValue("service", val)}>
                    <SelectTrigger className={errors.service ? "border-red-400" : ""}>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="household">Household Shifting</SelectItem>
                      <SelectItem value="office">Office Relocation</SelectItem>
                      <SelectItem value="car">Car Transport</SelectItem>
                      <SelectItem value="bike">Bike Transport</SelectItem>
                      <SelectItem value="warehouse">Warehousing</SelectItem>
                      <SelectItem value="packing">Packing Only</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.service && (
                    <p className="text-red-400 text-xs">{errors.service.message}</p>
                  )}
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full group mt-2" disabled={isLoading}>
                {isLoading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
                ) : (
                  <>Get My Free Quote<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" /></>
                )}
              </Button>

              {apiError && <p className="text-red-400 text-xs text-center">{apiError}</p>}              <p className="text-center text-gray-500 text-xs">
                🔒 Your data is safe. No spam, ever.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
