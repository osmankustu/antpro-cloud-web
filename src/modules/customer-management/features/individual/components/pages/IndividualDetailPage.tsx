'use client';
import { formatDate } from '@/core/utils/formatters/dateFormatter';
import { IndividualCustomerModel } from '@/modules/customer-management/types/individual.types.';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface IndividualDetailPageProps {
  customer?: IndividualCustomerModel;
  isLoading: boolean;
  isFetching: boolean;
  router: AppRouterInstance;
  error?: any;
  onRetry?: () => void;
  onDelete: (id?: string) => void;
}

export default function IndividualDetailPage({
  customer,
  isLoading,
  isFetching,
  router,
  error,
  onRetry,
}: IndividualDetailPageProps) {
  if (isLoading || isFetching) {
    return <Skeleton />;
  }

  if (!isLoading && !isFetching && error) {
    return (
      <div className="mt-25 text-center text-sm text-red-500 dark:text-red-400">
        {error.detail || 'Servis bilgileri yüklenemedi.'}
        <button className="mb-25 ml-2 underline" onClick={onRetry}>
          Tekrar Dene
        </button>
      </div>
    );
  }

  if (!customer) {
    return <div className="text-center text-gray-500 dark:text-gray-400">Servis bulunamadı.</div>;
  }

  return (
    <div className="space-y-8">
      {/* Genel */}
      <Section title="Genel Bilgiler">
        <Row>
          <Field label="Müşteri Adı-Soyadı" value={customer.fullName || '-'} />
          <Field label="Müşteri Numarası" value={customer.customerNo} />
          <Field label="Müşteri Tipi" value={'Bireysel'} />
        </Row>
        <Row>
          <Field label="Oluşturma Tarihi" value={formatDate(customer.createdDate)} />
          <Field label="Güncellenme Tarihi" value={formatDate(customer.updatedDate)} />
        </Row>
      </Section>

      {/* Contact */}
      <Section title="İletişim Bilgileri">
        <Row>
          <Field label="Email" value={customer.email} />
          <Field label="Telefon" value={customer.phoneNumber} />
        </Row>
      </Section>

      {/* Address */}
      <Section title="Adresler">
        <FullRow>x</FullRow>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="mb-5 text-base font-semibold text-gray-800 dark:text-white/90">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

function FullRow({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

function Field({ label, value }: { label: string; value?: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
      <div className="mt-1 text-base font-semibold text-gray-800 dark:text-white/90">
        {value || '-'}
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="grid animate-pulse grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="h-20 rounded-xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-800"
        />
      ))}
    </div>
  );
}
