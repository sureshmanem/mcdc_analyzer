from typing import List, Dict
import itertools

class MCDCAnalyzer:
    def __init__(self, conditions: List[str], expression: str):
        self.conditions = conditions
        self.expression = expression

    def evaluate(self, values: Dict[str, bool]) -> bool:
        # Evaluate the Boolean expression with given values
        expr = self.expression
        for cond, val in values.items():
            expr = expr.replace(cond, str(val))
        return eval(expr)

    def generate_truth_table(self) -> List[Dict[str, bool]]:
        # Generate all combinations of True/False for conditions
        combos = list(itertools.product([True, False], repeat=len(self.conditions)))
        table = []
        for combo in combos:
            row = dict(zip(self.conditions, combo))
            table.append(row)
        return table

    def find_mcdc_cases(self) -> List[Dict[str, bool]]:
        # Find MC/DC test cases
        table = self.generate_truth_table()
        mcdc_cases = []
        for i, cond in enumerate(self.conditions):
            for row1 in table:
                for row2 in table:
                    if row1 == row2:
                        continue
                    # Only one condition differs
                    diff = [c for c in self.conditions if row1[c] != row2[c]]
                    if diff == [cond]:
                        out1 = self.evaluate(row1)
                        out2 = self.evaluate(row2)
                        if out1 != out2:
                            mcdc_cases.append(row1)
                            mcdc_cases.append(row2)
        # Remove duplicates
        unique_cases = [dict(t) for t in {tuple(sorted(d.items())) for d in mcdc_cases}]
        return unique_cases
