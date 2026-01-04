/**
 * Address DTOs
 *
 * Never expose `AddressEntity` (DB row) directly.
 */

import type { AddressEntity } from "../entities/address.entity";

/**
 * DTO Público - Endereço com granularidade mínima (ex.: listagens públicas)
 */
export interface AddressPublicDTO {
  id: string;
  city: string;
  state: string;
  country: string;
}

/**
 * DTO Privado - Endereço completo (ex.: dono/usuário logado)
 */
export interface AddressPrivateDTO extends AddressPublicDTO {
  createdAt: string;
  zipcode: string;
  neighborhood: string | null;
  street: string | null;
  number: string | null;
  coordinates: string | null;
}

export function toAddressPublicDTO(address: AddressEntity): AddressPublicDTO {
  return {
    id: address.id,
    city: address.city,
    state: address.state,
    country: address.country,
  };
}

export function toAddressPrivateDTO(address: AddressEntity): AddressPrivateDTO {
  return {
    ...toAddressPublicDTO(address),
    createdAt: address.created_at,
    zipcode: address.zipcode,
    neighborhood: address.neighborhood,
    street: address.street,
    number: address.number,
    coordinates: address.coordinates,
  };
}

export function toAddressPublicDTOs(addresses: AddressEntity[]): AddressPublicDTO[] {
  return addresses.map(toAddressPublicDTO);
}


