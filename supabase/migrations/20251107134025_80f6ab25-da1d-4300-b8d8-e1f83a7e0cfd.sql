-- Tighten member task creation policy to prevent assigning tasks to arbitrary users
DROP POLICY IF EXISTS "Members can insert tasks" ON public.tasks;

CREATE POLICY "Members can insert tasks assigned to themselves"
ON public.tasks
FOR INSERT
TO authenticated
WITH CHECK (
  NOT public.has_role(auth.uid(), 'admin'::app_role)
  AND (assignee_id = auth.uid() OR assignee_id IS NULL)
  AND (created_by = auth.uid() OR created_by IS NULL)
);