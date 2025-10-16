export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      balancesheets: {
        Row: {
          accounts_payable: number | null
          accounts_receivable: number | null
          accumulated_depreciation: number | null
          allowance_for_doubtful_accounts_receivable: number | null
          balance_sheet_id: number
          capital_stock: number | null
          cash_and_cash_equivalents: number | null
          cash_cash_equivalents_and_short_term_investments: number | null
          cash_equivalents: number | null
          common_stock: number | null
          common_stock_equity: number | null
          company_id: number
          created_at: string | null
          current_assets: number | null
          current_debt: number | null
          current_debt_and_capital_lease_obligation: number | null
          current_liabilities: number | null
          gains_losses_not_affecting_retained_earnings: number | null
          goodwill: number | null
          goodwill_and_other_intangible_assets: number | null
          gross_accounts_receivable: number | null
          gross_ppe: number | null
          inventory: number | null
          invested_capital: number | null
          investments_and_advances: number | null
          land_and_improvements: number | null
          leases: number | null
          long_term_capital_lease_obligation: number | null
          long_term_debt: number | null
          long_term_debt_and_capital_lease_obligation: number | null
          machinery_furniture_equipment: number | null
          minority_interest: number | null
          net_debt: number | null
          net_ppe: number | null
          ordinary_shares_number: number | null
          other_current_liabilities: number | null
          other_equity_adjustments: number | null
          other_intangible_assets: number | null
          other_non_current_assets: number | null
          other_non_current_liabilities: number | null
          other_properties: number | null
          other_receivables: number | null
          other_short_term_investments: number | null
          payables: number | null
          payables_and_accrued_expenses: number | null
          properties: number | null
          quarter: string
          receivables: number | null
          retained_earnings: number | null
          share_issued: number | null
          stockholders_equity: number | null
          tangible_book_value: number | null
          total_assets: number | null
          total_capitalization: number | null
          total_debt: number | null
          total_equity_gross_minority_interest: number | null
          total_liabilities_net_minority_interest: number | null
          total_non_current_liabilities_net_minority_interest: number | null
          total_tax_payable: number | null
          treasury_shares_number: number | null
          updated_at: string | null
          working_capital: number | null
          year: number
        }
        Insert: {
          accounts_payable?: number | null
          accounts_receivable?: number | null
          accumulated_depreciation?: number | null
          allowance_for_doubtful_accounts_receivable?: number | null
          balance_sheet_id?: number
          capital_stock?: number | null
          cash_and_cash_equivalents?: number | null
          cash_cash_equivalents_and_short_term_investments?: number | null
          cash_equivalents?: number | null
          common_stock?: number | null
          common_stock_equity?: number | null
          company_id: number
          created_at?: string | null
          current_assets?: number | null
          current_debt?: number | null
          current_debt_and_capital_lease_obligation?: number | null
          current_liabilities?: number | null
          gains_losses_not_affecting_retained_earnings?: number | null
          goodwill?: number | null
          goodwill_and_other_intangible_assets?: number | null
          gross_accounts_receivable?: number | null
          gross_ppe?: number | null
          inventory?: number | null
          invested_capital?: number | null
          investments_and_advances?: number | null
          land_and_improvements?: number | null
          leases?: number | null
          long_term_capital_lease_obligation?: number | null
          long_term_debt?: number | null
          long_term_debt_and_capital_lease_obligation?: number | null
          machinery_furniture_equipment?: number | null
          minority_interest?: number | null
          net_debt?: number | null
          net_ppe?: number | null
          ordinary_shares_number?: number | null
          other_current_liabilities?: number | null
          other_equity_adjustments?: number | null
          other_intangible_assets?: number | null
          other_non_current_assets?: number | null
          other_non_current_liabilities?: number | null
          other_properties?: number | null
          other_receivables?: number | null
          other_short_term_investments?: number | null
          payables?: number | null
          payables_and_accrued_expenses?: number | null
          properties?: number | null
          quarter: string
          receivables?: number | null
          retained_earnings?: number | null
          share_issued?: number | null
          stockholders_equity?: number | null
          tangible_book_value?: number | null
          total_assets?: number | null
          total_capitalization?: number | null
          total_debt?: number | null
          total_equity_gross_minority_interest?: number | null
          total_liabilities_net_minority_interest?: number | null
          total_non_current_liabilities_net_minority_interest?: number | null
          total_tax_payable?: number | null
          treasury_shares_number?: number | null
          updated_at?: string | null
          working_capital?: number | null
          year: number
        }
        Update: {
          accounts_payable?: number | null
          accounts_receivable?: number | null
          accumulated_depreciation?: number | null
          allowance_for_doubtful_accounts_receivable?: number | null
          balance_sheet_id?: number
          capital_stock?: number | null
          cash_and_cash_equivalents?: number | null
          cash_cash_equivalents_and_short_term_investments?: number | null
          cash_equivalents?: number | null
          common_stock?: number | null
          common_stock_equity?: number | null
          company_id?: number
          created_at?: string | null
          current_assets?: number | null
          current_debt?: number | null
          current_debt_and_capital_lease_obligation?: number | null
          current_liabilities?: number | null
          gains_losses_not_affecting_retained_earnings?: number | null
          goodwill?: number | null
          goodwill_and_other_intangible_assets?: number | null
          gross_accounts_receivable?: number | null
          gross_ppe?: number | null
          inventory?: number | null
          invested_capital?: number | null
          investments_and_advances?: number | null
          land_and_improvements?: number | null
          leases?: number | null
          long_term_capital_lease_obligation?: number | null
          long_term_debt?: number | null
          long_term_debt_and_capital_lease_obligation?: number | null
          machinery_furniture_equipment?: number | null
          minority_interest?: number | null
          net_debt?: number | null
          net_ppe?: number | null
          ordinary_shares_number?: number | null
          other_current_liabilities?: number | null
          other_equity_adjustments?: number | null
          other_intangible_assets?: number | null
          other_non_current_assets?: number | null
          other_non_current_liabilities?: number | null
          other_properties?: number | null
          other_receivables?: number | null
          other_short_term_investments?: number | null
          payables?: number | null
          payables_and_accrued_expenses?: number | null
          properties?: number | null
          quarter?: string
          receivables?: number | null
          retained_earnings?: number | null
          share_issued?: number | null
          stockholders_equity?: number | null
          tangible_book_value?: number | null
          total_assets?: number | null
          total_capitalization?: number | null
          total_debt?: number | null
          total_equity_gross_minority_interest?: number | null
          total_liabilities_net_minority_interest?: number | null
          total_non_current_liabilities_net_minority_interest?: number | null
          total_tax_payable?: number | null
          treasury_shares_number?: number | null
          updated_at?: string | null
          working_capital?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "balancesheets_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "saudimarketcompanies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      clientbalancesheets: {
        Row: {
          accounts_payable: number | null
          accounts_receivable: number | null
          accumulated_depreciation: number | null
          allowance_for_doubtful_accounts_receivable: number | null
          balance_sheet_id: number
          capital_stock: number | null
          cash_and_cash_equivalents: number | null
          cash_cash_equivalents_and_short_term_investments: number | null
          cash_equivalents: number | null
          client_company_id: number
          common_stock: number | null
          common_stock_equity: number | null
          created_at: string | null
          current_assets: number | null
          current_debt: number | null
          current_debt_and_capital_lease_obligation: number | null
          current_liabilities: number | null
          gains_losses_not_affecting_retained_earnings: number | null
          goodwill: number | null
          goodwill_and_other_intangible_assets: number | null
          gross_accounts_receivable: number | null
          gross_ppe: number | null
          inventory: number | null
          invested_capital: number | null
          investments_and_advances: number | null
          land_and_improvements: number | null
          leases: number | null
          long_term_capital_lease_obligation: number | null
          long_term_debt: number | null
          long_term_debt_and_capital_lease_obligation: number | null
          machinery_furniture_equipment: number | null
          minority_interest: number | null
          net_debt: number | null
          net_ppe: number | null
          ordinary_shares_number: number | null
          other_current_liabilities: number | null
          other_equity_adjustments: number | null
          other_intangible_assets: number | null
          other_non_current_assets: number | null
          other_non_current_liabilities: number | null
          other_properties: number | null
          other_receivables: number | null
          other_short_term_investments: number | null
          payables: number | null
          payables_and_accrued_expenses: number | null
          properties: number | null
          quarter: string
          receivables: number | null
          retained_earnings: number | null
          share_issued: number | null
          stockholders_equity: number | null
          tangible_book_value: number | null
          total_assets: number | null
          total_capitalization: number | null
          total_debt: number | null
          total_equity_gross_minority_interest: number | null
          total_liabilities_net_minority_interest: number | null
          total_non_current_liabilities_net_minority_interest: number | null
          total_tax_payable: number | null
          treasury_shares_number: number | null
          updated_at: string | null
          working_capital: number | null
          year: number
        }
        Insert: {
          accounts_payable?: number | null
          accounts_receivable?: number | null
          accumulated_depreciation?: number | null
          allowance_for_doubtful_accounts_receivable?: number | null
          balance_sheet_id?: number
          capital_stock?: number | null
          cash_and_cash_equivalents?: number | null
          cash_cash_equivalents_and_short_term_investments?: number | null
          cash_equivalents?: number | null
          client_company_id: number
          common_stock?: number | null
          common_stock_equity?: number | null
          created_at?: string | null
          current_assets?: number | null
          current_debt?: number | null
          current_debt_and_capital_lease_obligation?: number | null
          current_liabilities?: number | null
          gains_losses_not_affecting_retained_earnings?: number | null
          goodwill?: number | null
          goodwill_and_other_intangible_assets?: number | null
          gross_accounts_receivable?: number | null
          gross_ppe?: number | null
          inventory?: number | null
          invested_capital?: number | null
          investments_and_advances?: number | null
          land_and_improvements?: number | null
          leases?: number | null
          long_term_capital_lease_obligation?: number | null
          long_term_debt?: number | null
          long_term_debt_and_capital_lease_obligation?: number | null
          machinery_furniture_equipment?: number | null
          minority_interest?: number | null
          net_debt?: number | null
          net_ppe?: number | null
          ordinary_shares_number?: number | null
          other_current_liabilities?: number | null
          other_equity_adjustments?: number | null
          other_intangible_assets?: number | null
          other_non_current_assets?: number | null
          other_non_current_liabilities?: number | null
          other_properties?: number | null
          other_receivables?: number | null
          other_short_term_investments?: number | null
          payables?: number | null
          payables_and_accrued_expenses?: number | null
          properties?: number | null
          quarter: string
          receivables?: number | null
          retained_earnings?: number | null
          share_issued?: number | null
          stockholders_equity?: number | null
          tangible_book_value?: number | null
          total_assets?: number | null
          total_capitalization?: number | null
          total_debt?: number | null
          total_equity_gross_minority_interest?: number | null
          total_liabilities_net_minority_interest?: number | null
          total_non_current_liabilities_net_minority_interest?: number | null
          total_tax_payable?: number | null
          treasury_shares_number?: number | null
          updated_at?: string | null
          working_capital?: number | null
          year: number
        }
        Update: {
          accounts_payable?: number | null
          accounts_receivable?: number | null
          accumulated_depreciation?: number | null
          allowance_for_doubtful_accounts_receivable?: number | null
          balance_sheet_id?: number
          capital_stock?: number | null
          cash_and_cash_equivalents?: number | null
          cash_cash_equivalents_and_short_term_investments?: number | null
          cash_equivalents?: number | null
          client_company_id?: number
          common_stock?: number | null
          common_stock_equity?: number | null
          created_at?: string | null
          current_assets?: number | null
          current_debt?: number | null
          current_debt_and_capital_lease_obligation?: number | null
          current_liabilities?: number | null
          gains_losses_not_affecting_retained_earnings?: number | null
          goodwill?: number | null
          goodwill_and_other_intangible_assets?: number | null
          gross_accounts_receivable?: number | null
          gross_ppe?: number | null
          inventory?: number | null
          invested_capital?: number | null
          investments_and_advances?: number | null
          land_and_improvements?: number | null
          leases?: number | null
          long_term_capital_lease_obligation?: number | null
          long_term_debt?: number | null
          long_term_debt_and_capital_lease_obligation?: number | null
          machinery_furniture_equipment?: number | null
          minority_interest?: number | null
          net_debt?: number | null
          net_ppe?: number | null
          ordinary_shares_number?: number | null
          other_current_liabilities?: number | null
          other_equity_adjustments?: number | null
          other_intangible_assets?: number | null
          other_non_current_assets?: number | null
          other_non_current_liabilities?: number | null
          other_properties?: number | null
          other_receivables?: number | null
          other_short_term_investments?: number | null
          payables?: number | null
          payables_and_accrued_expenses?: number | null
          properties?: number | null
          quarter?: string
          receivables?: number | null
          retained_earnings?: number | null
          share_issued?: number | null
          stockholders_equity?: number | null
          tangible_book_value?: number | null
          total_assets?: number | null
          total_capitalization?: number | null
          total_debt?: number | null
          total_equity_gross_minority_interest?: number | null
          total_liabilities_net_minority_interest?: number | null
          total_non_current_liabilities_net_minority_interest?: number | null
          total_tax_payable?: number | null
          treasury_shares_number?: number | null
          updated_at?: string | null
          working_capital?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "clientbalancesheets_client_company_id_fkey"
            columns: ["client_company_id"]
            isOneToOne: false
            referencedRelation: "clientcompanies"
            referencedColumns: ["client_company_id"]
          },
        ]
      }
      clientcompanies: {
        Row: {
          client_company_id: number
          client_id: number
          company_name: string
          industry: string | null
          sector_id: number | null
        }
        Insert: {
          client_company_id?: number
          client_id: number
          company_name: string
          industry?: string | null
          sector_id?: number | null
        }
        Update: {
          client_company_id?: number
          client_id?: number
          company_name?: string
          industry?: string | null
          sector_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "clientcompanies_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "clientcompanies_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "sectors"
            referencedColumns: ["sector_id"]
          },
        ]
      }
      clientincomestatements: {
        Row: {
          amortization_of_intangibles_income_statement: number | null
          basic_average_shares: number | null
          basic_eps: number | null
          client_company_id: number
          cost_of_revenue: number | null
          created_at: string | null
          depreciation: number | null
          depreciation_and_amortization_in_income_statement: number | null
          diluted_average_shares: number | null
          diluted_eps: number | null
          diluted_ni_available_to_com_stockholders: number | null
          earnings_from_equity_interest: number | null
          ebit: number | null
          ebitda: number | null
          gain_on_sale_of_security: number | null
          general_and_administrative_expense: number | null
          gross_profit: number | null
          interest_expense: number | null
          interest_income: number | null
          net_income_common_stockholders: number | null
          net_income_from_continuing_and_discontinued_operation: number | null
          net_income_from_continuing_operation_net_minority_interest:
            | number
            | null
          net_interest_income: number | null
          net_non_operating_interest_income_expense: number | null
          normalized_ebitda: number | null
          normalized_income: number | null
          operating_expense: number | null
          operating_income: number | null
          other_income_expense: number | null
          other_non_operating_income_expenses: number | null
          pretax_income: number | null
          quarter: string
          reconciled_cost_of_revenue: number | null
          reconciled_depreciation: number | null
          research_and_development: number | null
          selling_general_and_administration: number | null
          statement_id: number
          tax_effect_of_unusual_items: number | null
          tax_provision: number | null
          tax_rate_for_calcs: number | null
          total_expenses: number | null
          total_operating_income_as_reported: number | null
          total_revenue: number | null
          total_unusual_items: number | null
          total_unusual_items_excluding_goodwill: number | null
          updated_at: string | null
          year: number
        }
        Insert: {
          amortization_of_intangibles_income_statement?: number | null
          basic_average_shares?: number | null
          basic_eps?: number | null
          client_company_id: number
          cost_of_revenue?: number | null
          created_at?: string | null
          depreciation?: number | null
          depreciation_and_amortization_in_income_statement?: number | null
          diluted_average_shares?: number | null
          diluted_eps?: number | null
          diluted_ni_available_to_com_stockholders?: number | null
          earnings_from_equity_interest?: number | null
          ebit?: number | null
          ebitda?: number | null
          gain_on_sale_of_security?: number | null
          general_and_administrative_expense?: number | null
          gross_profit?: number | null
          interest_expense?: number | null
          interest_income?: number | null
          net_income_common_stockholders?: number | null
          net_income_from_continuing_and_discontinued_operation?: number | null
          net_income_from_continuing_operation_net_minority_interest?:
            | number
            | null
          net_interest_income?: number | null
          net_non_operating_interest_income_expense?: number | null
          normalized_ebitda?: number | null
          normalized_income?: number | null
          operating_expense?: number | null
          operating_income?: number | null
          other_income_expense?: number | null
          other_non_operating_income_expenses?: number | null
          pretax_income?: number | null
          quarter: string
          reconciled_cost_of_revenue?: number | null
          reconciled_depreciation?: number | null
          research_and_development?: number | null
          selling_general_and_administration?: number | null
          statement_id?: number
          tax_effect_of_unusual_items?: number | null
          tax_provision?: number | null
          tax_rate_for_calcs?: number | null
          total_expenses?: number | null
          total_operating_income_as_reported?: number | null
          total_revenue?: number | null
          total_unusual_items?: number | null
          total_unusual_items_excluding_goodwill?: number | null
          updated_at?: string | null
          year: number
        }
        Update: {
          amortization_of_intangibles_income_statement?: number | null
          basic_average_shares?: number | null
          basic_eps?: number | null
          client_company_id?: number
          cost_of_revenue?: number | null
          created_at?: string | null
          depreciation?: number | null
          depreciation_and_amortization_in_income_statement?: number | null
          diluted_average_shares?: number | null
          diluted_eps?: number | null
          diluted_ni_available_to_com_stockholders?: number | null
          earnings_from_equity_interest?: number | null
          ebit?: number | null
          ebitda?: number | null
          gain_on_sale_of_security?: number | null
          general_and_administrative_expense?: number | null
          gross_profit?: number | null
          interest_expense?: number | null
          interest_income?: number | null
          net_income_common_stockholders?: number | null
          net_income_from_continuing_and_discontinued_operation?: number | null
          net_income_from_continuing_operation_net_minority_interest?:
            | number
            | null
          net_interest_income?: number | null
          net_non_operating_interest_income_expense?: number | null
          normalized_ebitda?: number | null
          normalized_income?: number | null
          operating_expense?: number | null
          operating_income?: number | null
          other_income_expense?: number | null
          other_non_operating_income_expenses?: number | null
          pretax_income?: number | null
          quarter?: string
          reconciled_cost_of_revenue?: number | null
          reconciled_depreciation?: number | null
          research_and_development?: number | null
          selling_general_and_administration?: number | null
          statement_id?: number
          tax_effect_of_unusual_items?: number | null
          tax_provision?: number | null
          tax_rate_for_calcs?: number | null
          total_expenses?: number | null
          total_operating_income_as_reported?: number | null
          total_revenue?: number | null
          total_unusual_items?: number | null
          total_unusual_items_excluding_goodwill?: number | null
          updated_at?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "clientincomestatements_client_company_id_fkey"
            columns: ["client_company_id"]
            isOneToOne: false
            referencedRelation: "clientcompanies"
            referencedColumns: ["client_company_id"]
          },
        ]
      }
      clients: {
        Row: {
          client_id: number
          email: string
          full_name: string
          password_hash: string
        }
        Insert: {
          client_id?: number
          email: string
          full_name: string
          password_hash: string
        }
        Update: {
          client_id?: number
          email?: string
          full_name?: string
          password_hash?: string
        }
        Relationships: []
      }
      incomestatements: {
        Row: {
          amortization_of_intangibles_income_statement: number | null
          basic_average_shares: number | null
          basic_eps: number | null
          company_id: number
          cost_of_revenue: number | null
          created_at: string | null
          depreciation: number | null
          depreciation_and_amortization_in_income_statement: number | null
          diluted_average_shares: number | null
          diluted_eps: number | null
          diluted_ni_available_to_com_stockholders: number | null
          earnings_from_equity_interest: number | null
          ebit: number | null
          ebitda: number | null
          gain_on_sale_of_security: number | null
          general_and_administrative_expense: number | null
          gross_profit: number | null
          interest_expense: number | null
          interest_income: number | null
          net_income_common_stockholders: number | null
          net_income_from_continuing_and_discontinued_operation: number | null
          net_income_from_continuing_operation_net_minority_interest:
            | number
            | null
          net_interest_income: number | null
          net_non_operating_interest_income_expense: number | null
          normalized_ebitda: number | null
          normalized_income: number | null
          operating_expense: number | null
          operating_income: number | null
          other_income_expense: number | null
          other_non_operating_income_expenses: number | null
          pretax_income: number | null
          quarter: string
          reconciled_cost_of_revenue: number | null
          reconciled_depreciation: number | null
          research_and_development: number | null
          selling_general_and_administration: number | null
          statement_id: number
          tax_effect_of_unusual_items: number | null
          tax_provision: number | null
          tax_rate_for_calcs: number | null
          total_expenses: number | null
          total_operating_income_as_reported: number | null
          total_revenue: number | null
          total_unusual_items: number | null
          total_unusual_items_excluding_goodwill: number | null
          updated_at: string | null
          year: number
        }
        Insert: {
          amortization_of_intangibles_income_statement?: number | null
          basic_average_shares?: number | null
          basic_eps?: number | null
          company_id: number
          cost_of_revenue?: number | null
          created_at?: string | null
          depreciation?: number | null
          depreciation_and_amortization_in_income_statement?: number | null
          diluted_average_shares?: number | null
          diluted_eps?: number | null
          diluted_ni_available_to_com_stockholders?: number | null
          earnings_from_equity_interest?: number | null
          ebit?: number | null
          ebitda?: number | null
          gain_on_sale_of_security?: number | null
          general_and_administrative_expense?: number | null
          gross_profit?: number | null
          interest_expense?: number | null
          interest_income?: number | null
          net_income_common_stockholders?: number | null
          net_income_from_continuing_and_discontinued_operation?: number | null
          net_income_from_continuing_operation_net_minority_interest?:
            | number
            | null
          net_interest_income?: number | null
          net_non_operating_interest_income_expense?: number | null
          normalized_ebitda?: number | null
          normalized_income?: number | null
          operating_expense?: number | null
          operating_income?: number | null
          other_income_expense?: number | null
          other_non_operating_income_expenses?: number | null
          pretax_income?: number | null
          quarter: string
          reconciled_cost_of_revenue?: number | null
          reconciled_depreciation?: number | null
          research_and_development?: number | null
          selling_general_and_administration?: number | null
          statement_id?: number
          tax_effect_of_unusual_items?: number | null
          tax_provision?: number | null
          tax_rate_for_calcs?: number | null
          total_expenses?: number | null
          total_operating_income_as_reported?: number | null
          total_revenue?: number | null
          total_unusual_items?: number | null
          total_unusual_items_excluding_goodwill?: number | null
          updated_at?: string | null
          year: number
        }
        Update: {
          amortization_of_intangibles_income_statement?: number | null
          basic_average_shares?: number | null
          basic_eps?: number | null
          company_id?: number
          cost_of_revenue?: number | null
          created_at?: string | null
          depreciation?: number | null
          depreciation_and_amortization_in_income_statement?: number | null
          diluted_average_shares?: number | null
          diluted_eps?: number | null
          diluted_ni_available_to_com_stockholders?: number | null
          earnings_from_equity_interest?: number | null
          ebit?: number | null
          ebitda?: number | null
          gain_on_sale_of_security?: number | null
          general_and_administrative_expense?: number | null
          gross_profit?: number | null
          interest_expense?: number | null
          interest_income?: number | null
          net_income_common_stockholders?: number | null
          net_income_from_continuing_and_discontinued_operation?: number | null
          net_income_from_continuing_operation_net_minority_interest?:
            | number
            | null
          net_interest_income?: number | null
          net_non_operating_interest_income_expense?: number | null
          normalized_ebitda?: number | null
          normalized_income?: number | null
          operating_expense?: number | null
          operating_income?: number | null
          other_income_expense?: number | null
          other_non_operating_income_expenses?: number | null
          pretax_income?: number | null
          quarter?: string
          reconciled_cost_of_revenue?: number | null
          reconciled_depreciation?: number | null
          research_and_development?: number | null
          selling_general_and_administration?: number | null
          statement_id?: number
          tax_effect_of_unusual_items?: number | null
          tax_provision?: number | null
          tax_rate_for_calcs?: number | null
          total_expenses?: number | null
          total_operating_income_as_reported?: number | null
          total_revenue?: number | null
          total_unusual_items?: number | null
          total_unusual_items_excluding_goodwill?: number | null
          updated_at?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "incomestatements_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "saudimarketcompanies"
            referencedColumns: ["company_id"]
          },
        ]
      }
      performancebenchmarks: {
        Row: {
          benchmark_id: number
          benchmark_value: number | null
          calculation_date: string | null
          metric_name: string
          period: string | null
          sector_id: number
        }
        Insert: {
          benchmark_id?: number
          benchmark_value?: number | null
          calculation_date?: string | null
          metric_name: string
          period?: string | null
          sector_id: number
        }
        Update: {
          benchmark_id?: number
          benchmark_value?: number | null
          calculation_date?: string | null
          metric_name?: string
          period?: string | null
          sector_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "performancebenchmarks_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "sectors"
            referencedColumns: ["sector_id"]
          },
        ]
      }
      saudimarketcompanies: {
        Row: {
          company_id: number
          company_name: string
          sector_id: number | null
          ticker: string
        }
        Insert: {
          company_id?: number
          company_name: string
          sector_id?: number | null
          ticker: string
        }
        Update: {
          company_id?: number
          company_name?: string
          sector_id?: number | null
          ticker?: string
        }
        Relationships: [
          {
            foreignKeyName: "saudimarketcompanies_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "sectors"
            referencedColumns: ["sector_id"]
          },
        ]
      }
      sectors: {
        Row: {
          description: string | null
          sector_id: number
          sector_name: string
        }
        Insert: {
          description?: string | null
          sector_id?: number
          sector_name: string
        }
        Update: {
          description?: string | null
          sector_id?: number
          sector_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
