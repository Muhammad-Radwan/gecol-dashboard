import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from 'react'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from './ui/form'

const administration = [
  {id: 11, name: 'إدارة خدمات المستهلكين طرابلس'},
  {id: 12, name: 'إدارة خدمات المستهلكين بنغازي'},
  {id: 13, name: 'إدارة خدمات المستهلكين الوسطى'},
  {id: 14, name: 'إدارة خدمات المستهلكين الغربية'},
  {id: 15, name: 'إدارة خدمات المستهلكين الجنوبية'},
  {id: 16, name: 'إدارة خدمات المستهلكين الجبل الأخضر'},
  {id: 17, name: 'إدارة خدمات المستهلكين المرقب'},
  {id: 18, name: 'إدارة خدمات المستهلكين غريان'},
  {id: 19, name: 'إدارة خدمات المستهلكين ترهونة'},
  {id: 20, name: 'إدارة خدمات المستهلكين الساحل الغربي'},
  {id: 21, name: 'إدارة خدمات المستهلكين زليتن'},
  {id: 22, name: 'إدارة خدمات المستهلكين طبرق'},
  {id: 23, name: 'إدارة خدمات المستهلكين الجفارة'},
  {id: 24, name: 'إدارة خدمات المستهلكين الجبل'},
  {id: 25, name: 'إدارة خدمات المستهلكين درنة'},
  {id: 26, name: 'إدارة خدمات الجهات العامة والشركات'},
  {id: 27, name: 'إدارة خدمات المستهلكين سوق الجمعة والنواحي الأربعة'},
  {id: 28, name: 'إدارة خدمات المستهلكين اجدابيا الهلال النفطي'},
]

const AdministrationSelect = () => {
  return (
        <FormField
              name="administrationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الإدارة</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue='12'
                  >
                    <FormControl>
                      <SelectTrigger className="w-[400px]">
                        <SelectValue placeholder="اختر من القائمة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {administration.map((admin) => (
                        <SelectItem key={admin.id} value={admin.id.toString()}>
                          {admin.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
  )
}

export default AdministrationSelect