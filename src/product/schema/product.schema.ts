import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Campus } from '@campus/schema/campus.schema';
import { Department } from '@department/schema/department.schema';
import { Province } from '@province/schema/province.schema';
import { District } from '@district/schema/district.schema';
import { City } from '@city/schema/city.schema';
import { Activity } from '@activity/schema/activity.schema';
import { Category } from '@category/schema/category.schema';
import { Risk } from '@risk/schema/risk.schema';

// (Opcional) importa el esquema de Location si existe.
// import { Location } from '@location/schema/location.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
      return ret;
    },
  },
})
export class Product {
  /* ---------- Datos básicos ---------- */
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  /* ---------- Relaciones ---------- */
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Activity.name })
  activity_id?: Activity;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
  category_id?: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Risk.name })
  risk_id?: Risk;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Campus.name })
  campus_id?: Campus;

  /* ---------- Capacidad y precio ---------- */
  @Prop()
  capacity?: number;

  @Prop()
  registered?: number;

  @Prop()
  price?: number;

  /* ---------- Imagen ---------- */
  @Prop()
  image?: string;

  /* ---------- Fecha y hora ---------- */
  @Prop()
  activity_day?: string;

  @Prop()
  activity_duration?: number;

  @Prop()
  activity_time?: string;

  /* ---------- Ubicación (división política) ---------- */
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Department.name })
  activity_department_id?: Department;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Province.name })
  activity_province_id?: Province;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: District.name })
  activity_district_id?: District;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: City.name })
  activity_city_id?: City;

  /* ---------- Dirección específica ---------- */
  @Prop()
  activity_address?: string;

  /* ---------- Disponibilidad ---------- */
  @Prop({ default: false })
  is_available?: boolean;

  @Prop({ default: true })
  registration_availability?: boolean;

  /* ---------- NUEVOS CAMPOS ---------- */
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    // ref: Location.name, // Descomenta y ajusta si tienes colección de Location
  })
  location_reference_id?: mongoose.Types.ObjectId;

  @Prop()
  location_description?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
